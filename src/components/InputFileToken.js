def((Button, ErrorDialog) => {

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
    get template() { return '<a target="_blank" href="JavaScript:"><img ref="img"/></a>'; }
    set token(token) {
      if (token) {
        fetch(api.resolvePath([ this.api, token ]), { credentials: 'include' }).then(response => response.blob()).then(result => {
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
      if (!file) return this.value = null;
      let { limit } = this;
      const highlight = (templates, ...args) => {
        return String.raw(templates, ...args.map(data => `<code style="color:orange;font-weight:bold;">${data}</code>`));
      };
      return Promise.resolve().then(() => {
        // 如果没有任何限制条件则直接跳过检测
        if (!limit) return;
        // 检测文件的类型和大小
        switch(true) {
          case 'type' in limit && !new RegExp(limit.type).test(file.type):
            throw new Error(highlight`当前文件类型为 ${file.type}，不满足要求的类型`);
          case 'maxSize' in limit && file.size > limit.maxSize:
            throw new Error(highlight`文件大小 ${file.size} 字节，请选择小于或等于 ${limit.maxSize} 字节的图片`);
          case 'minSize' in limit && file.size < limit.minSize:
            throw new Error(highlight`文件大小 ${file.size} 字节，请选择大于或等于 ${limit.minSize} 字节的图片`);
        }
        // 如果限制中不包含任何关于图片大小的限制则则跳过后续检测
        if (![ 'width', 'maxWidth','minWidth', 'height', 'maxHeight', 'minHeight' ].some(key => key in limit)) return;
        // 加载图片并检测尺寸
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.addEventListener('load', resolve.bind(null, img));
          img.addEventListener('error', reject);
          img.src = URL.createObjectURL(file);
        }).then(img => {
          switch(true) {
            case 'width' in limit && img.width !== limit.width:
              throw new Error(highlight`当前图片宽度 ${img.width} 像素，必须为 ${limit.width} 像素`);
            case 'height' in limit && img.height !== limit.height:
              throw new Error(highlight`当前图片高度 ${img.height} 像素，必须为 ${limit.height} 像素`);
            case 'maxWidth' in limit && img.width > limit.maxWidth:
              throw new Error(highlight`当前图片宽度 ${img.width} 像素，请选择宽度小于或等于 ${limit.maxWidth} 像素的图片`);
            case 'maxHeight' in limit && img.height > limit.maxHeight:
              throw new Error(highlight`当前图片宽度 ${img.height} 像素，请选择高度小于或等于 ${limit.maxHeight} 像素的图片`);
            case 'minWidth' in limit && img.width < limit.minWidth:
              throw new Error(highlight`当前图片宽度 ${img.width} 像素，请选择宽度大于或等于 ${limit.minWidth} 像素的图片`);
            case 'minHeight' in limit && img.height < limit.minHeight:
              throw new Error(highlight`当前图片高度 ${img.height} 像素，请选择高度大于或等于 ${limit.minHeight} 像素的图片`);
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
