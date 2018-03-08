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
    set token(token) {
      if (token) {
        fetch(api.resolvePath([ this.api, encodeURIComponent(token) ]), {
          credentials: 'include'
        }).then(response => response.blob()).then(result => {
          let url = URL.createObjectURL(result);
          this.element.style.display = 'inline-block';
          this.element.href = url;
          this.img.onload = () => {
            this.info = { width: this.img.naturalWidth, height: this.img.naturalHeight };
          };
          this.img.src = url;
        });
      } else {
        this.element.style.display = 'none';
      }
    }
    click(event) {
      event.preventDefault();
      PureDialog.showImage({ url: this.img.src });
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
    get Preview() { return Preview; }
    get ClearButton() { return ClearButton; }
    get info() { return this.preview.info || {}; }
    get value() { return this.$value === void 0 ? null : this.$value; }
    set value(value = this.defaultValue) {
      this.$hasValue = true;
      this.$value = value;
      this.token = value;
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
          <jkl-preview ref="preview" api="{api}" token="{token}"></jkl-preview>
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
