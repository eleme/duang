def((Button, ErrorDialog, PureDialog) => {

  class SpanButton extends Button {
    get tagName() { return 'span'; }
    get styleSheet() {
      return `
        :scope {
          margin-right: 1em;
          display: inline-block;
        }
      `;
    }
  }

  class ClearButton extends Jinkela {
    init() {
      this.element.addEventListener('click', this.onClick);
    }
    get template() { return '<a href="JavaScript:">&#x274C;</a>'; }
    get styleSheet() {
      return `
        :scope {
          vertical-align: top;
          margin-left: 1em;
        }
      `;
    }
  }

  class Preview extends Jinkela {
    get template() { return '<a target="_blank" href="javascript:" on-click="{click}"><img ref="img" /></a>'; }
    get token() { return this.$token; }
    set token(value) {
      Object.defineProperty(this, '$token', { value, configurable: true });
      this.update();
    }
    get internalMimeIconMap() {
      let value = {
        'text/plain': '//fuss10.elemecdn.com/9/0b/a24cae44ba82ad8325cad35a2f87dpng.png',
        'text/csv': '//fuss10.elemecdn.com/9/93/db4df04f032ea6aee86208399f8afpng.png',
        'application/rar': '//fuss10.elemecdn.com/e/17/182cc40a1607a3738dbcfb83a203cpng.png',
        'application/zip': '//fuss10.elemecdn.com/f/be/fa7cd746fd8a7f18f9e7e35569ccapng.png',
        'application/pdf': 'https://fuss10.elemecdn.com/a/f3/c18c1dbb95e8fa4a804a96ebca9d0png.png',
        'application/vnd.ms-excel': '//fuss10.elemecdn.com/a/97/bf743d43418c1dbef89b566b5ed8apng.png',
        'application/vnd.ms-powerpoint': '//fuss10.elemecdn.com/4/3e/886ee7b59faf596a3a81f60da450cpng.png',
        'application/msword': '//fuss10.elemecdn.com/5/0e/b075e0ceaa38e9f83e7321dcf38a6png.png',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '//fuss10.elemecdn.com/3/81/176119defd395cf61c1343af79e26png.png',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '//fuss10.elemecdn.com/f/d5/b58a5c643d1d97eadea3f027823bfpng.png',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': '//fuss10.elemecdn.com/1/1c/9faa016e4dea890765062d0847bbdpng.png'
      };
      Object.defineProperty(this, 'internalMimeIconMap', { value, configurable: true });
      return value;
    }
    update() {
      let { token } = this;
      if (token) {
        let path = [ this.api, this.disableEncode ? token : encodeURIComponent(token) ];
        let params = {};
        if (!this.disableCredentialsForDownload) params.credentials = 'include';
        fetch(api.resolvePath(path), params).then(response => {
          let mime = response.headers.get('Content-Type');
          return response.blob().then(blob => {
            let url = URL.createObjectURL(blob);
            this.element.style.display = 'inline-block';
            this.element.href = url;
            if (/^image\//.test(mime)) {
              this.element.download = null;
              let info = this.info = {};
              this.img.onload = () => {
                info.width = this.img.naturalWidth;
                info.height = this.img.naturalHeight;
              };
              this.img.src = url;
            } else {
              this.element.download = token;
              this.info = null;
              this.img.onload = () => {};
              let defaultIcon = this.defaultIcon || '//fuss10.elemecdn.com/c/3f/61fb295909ab668c094f8ffe0bed6jpeg.jpeg';
              let mimeIconMap = Object.assign({}, this.internalMimeIconMap, this.mimeIconMap);
              this.img.src = mimeIconMap[mime] || defaultIcon;
            }
          });
        });
      } else {
        this.element.style.display = 'none';
      }
    }
    click(event) {
      if (this.info) {
        event.preventDefault();
        PureDialog.showImage({ url: this.img.src });
      }
    }
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          width: 28px;
          height: 28px;
          vertical-align: top;
          text-align: center;
          &::after {
            content: '';
            display: inline-block;
            height: 100%;
            width: 0px;
            vertical-align: middle;
          }
          img[src] {
            width: 28px;
            height: 28px;
            display: inline-block;
            box-shadow: 0 0 1px #E5E9F2;
          }
        }
      `;
    }
  }

  return class extends Jinkela {
    get SpanButton() { return SpanButton; }
    get ClearButton() { return ClearButton; }
    get info() { return this.previewObject.info || {}; }
    get value() {
      let value = this.$value === void 0 ? null : this.$value;
      if (this.notEmpty && !value) throw new Error('不能为空');
      return value;
    }
    set value(value = this.defaultValue) {
      this.$hasValue = true;
      this.$value = value;
      this.token = value;
      if (this.previewObject) this.previewObject.token = value;
      this.hasClearButton = !!value && !this.readonly;
    }
    get template() {
      return `
        <div>
          <label ref="label" if-not="{readonly}">
            <input ref="input" type="file" style="display: none;" />
            <jkl-span-button ref="button" text="{text}"></jkl-span-button>
          </label>
          <span class="empty" if-not="{token}">未选择</span>
          <meta ref="preview" />
          <jkl-clear-button if="{hasClearButton}" on-click="{clear}"></jkl-clear-button>
        </div>
      `;
    }
    clear() {
      this.input.value = null;
      this.input.dispatchEvent(new Event('change', { bubbles: true }));
    }
    init() {
      if (this.readonly) {
        this.element.classList.add('readonly');
      } else {
        if (!this.text) this.text = '请选择文件';
        this.input.addEventListener('change', event => this.change(event));
      }
      if (!this.$hasValue) this.value = void 0;
      let { api, disableCredentialsForDownload, disableEncode, defaultIcon, mimeIconMap } = this;
      let value;
      try {
        value = this.value;
      } catch (error) {
        void error;
      }
      this.previewObject = this.preview = new Preview({
        api, disableCredentialsForDownload, disableEncode, defaultIcon, mimeIconMap,
        token: value
      });
    }
    change(event) {
      let { target } = event;
      let file = target.files[0];
      if (!file) return (this.value = null);
      let { limit } = this;
      const highlight = (templates, ...args) => {
        return String.raw(templates, ...args.map(data => `<code style="color:orange;font-weight:bold;">${data}</code>`));
      };
      return Promise.resolve().then(() => {
        // 如果没有任何限制条件则直接跳过检测
        if (!limit) return;
        // 检测文件的类型和大小
        switch (true) {
          case 'type' in limit && !new RegExp(limit.type).test(file.type):
            throw new Error(highlight`当前文件类型为 ${file.type}，不满足要求的类型`);
          case 'maxSize' in limit && file.size > limit.maxSize:
            throw new Error(highlight`文件大小 ${file.size} 字节，请选择小于或等于 ${limit.maxSize} 字节的图片`);
          case 'minSize' in limit && file.size < limit.minSize:
            throw new Error(highlight`文件大小 ${file.size} 字节，请选择大于或等于 ${limit.minSize} 字节的图片`);
        }
        // 如果限制中不包含任何关于图片大小的限制则则跳过后续检测
        if (![ 'width', 'maxWidth', 'minWidth', 'height', 'maxHeight', 'minHeight' ].some(key => key in limit)) return;
        // 加载图片并检测尺寸
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.addEventListener('load', resolve.bind(null, img));
          img.addEventListener('error', reject);
          img.src = URL.createObjectURL(file);
        }).then(img => {
          switch (true) {
            case 'width' in limit && img.width !== limit.width:
            case 'height' in limit && img.height !== limit.height:
            case 'maxWidth' in limit && img.width > limit.maxWidth:
            case 'maxHeight' in limit && img.height > limit.maxHeight:
            case 'minWidth' in limit && img.width < limit.minWidth:
            case 'minHeight' in limit && img.height < limit.minHeight:
              let result = [ highlight`当前图片 ${img.width}x${img.height}` ];
              if ('width' in limit && 'height' in limit) {
                result.push(`必须为 ${limit.width}x${limit.height}`);
              } else {
                let map = { Width: '宽度', Height: '高度' };
                for (let type in map) {
                  if (type.toLowerCase() in limit) {
                    result.push(highlight`${map[type]} 必须为 ${limit[type.toLowerCase()]}`);
                  } else if (`max${type}` in limit && `min${type}` in limit) {
                    result.push(highlight`${map[type]} 必须在 ${limit['min' + type]} 到 ${limit['max' + type]} 之间`);
                  } else if (`max${type}` in limit) {
                    result.push(highlight`最大 ${map[type]} 不能大于 ${limit['max' + type]}`);
                  } else if (`min${type}` in limit) {
                    result.push(highlight`最小 ${map[type]} 不能小于 ${limit['min' + type]}`);
                  }
                }
              }
              throw new Error(result.join('，'));
          }
        });
      }).then(this.upload.bind(this, file)).then(result => {
        this.value = result;
      }, error => {
        this.clear();
        ErrorDialog.popup({ error });
      });
    }
    upload(file) {
      this.button.element.classList.add('busy');
      let task = api(this.api, { method: 'POST', body: file, headers: { 'Content-Type': file.type } });
      let removeBusy = () => this.button.element.classList.remove('busy');
      task.then(removeBusy, removeBusy);
      return task;
    }
    get styleSheet() {
      return `
        :scope {
          &[token=undefined] a { visibility: hidden; }
          &[token=""] a { visibility: hidden; }
          > .empty {
            color: #999;
            display: inline-block;
            vertical-align: middle;
          }
        }
      `;
    }
  };

});
