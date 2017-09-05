def((Button) => {

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
    get value() { return this.$value === null ? void 0 : this.$value; }
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
    clear() { this.value = null; }
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
      if (!file) return;
      this.button.element.classList.add('busy');
      api(this.api, { method: 'POST', body: file }).then(result => {
        this.button.element.classList.remove('busy');
        this.value = result;
      });
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
