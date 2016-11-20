def((Button) => {

  class SpanButton extends Button {
    get tagName() { return 'span'; }
    get styleSheet() {
      return `
        :scope {
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
    get template() { return `<a target="_blank" href="JavaScript:"><img/></a>`; }
    set token(token) {
      if (token) {
        api([ this.api, token ]).then(result => {
          let url = URL.createObjectURL(result);
          this.element.style.display = 'inline-block';
          this.element.href = url;
          this.element.firstChild.src = url;
        });
      } else {
        // this.element.style.display = 'none';
      }
    }
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          width: 28px;
          height: 28px;
          margin-left: .5em;
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
    get value() { return this.$value; }
    set value(value) {
      this.$value = value;
      this.token = value;
    }
    get template() {
      return `
        <div token="{token}">
          <label ref="label">
            <input ref="input" type="file" style="display: none;" />
            <jkl-span-button ref="button" text="{text}"></jkl-span-button>
          </label>
          <jkl-preview api="{api}" token="{token}"></jkl-preview>
          <jkl-clear-button on-click="{clear}"></jkl-clear-button>
        </div>
      `;
    }
    clear() { this.value = void 0; }
    init() {
      if (!this.text) this.text = '请选择文件';
      this.input.addEventListener('change', event => this.change(event));
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
        }
      `;
    }
  };

});
