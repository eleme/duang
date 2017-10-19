def((Item) => {

  class InputSelectItem extends Item {
    get tagName() { return 'option'; }
    init() {
      this.element.jinkela = this;
      this.element.setAttribute('value', this.value);
      this.element.textContent = this.text;
    }
  }

  return class extends Jinkela {
    get tagName() { return 'select'; }
    init() {
      this.element.addEventListener('change', event => this.change(event));
      this.initOptions();
      this.value = this.$hasValue ? this.$value : void 0;
    }
    get readonly() { return this.element.hasAttribute('disabled'); }
    set readonly(value) {
      if (value) {
        this.element.setAttribute('disabled', 'dsabled');
      } else {
        this.element.removeAttribute('disabled');
      }
    }
    initOptions() {
      let { options } = this;
      while (this.element.firstChild) this.element.firstChild.remove();
      if (options instanceof Array) {
        options = options.slice(0);
      } else {
        options = Object.keys(Object(options)).map(key => ({ text: options[key], value: key }));
      }
      if ('null' in this) options.unshift({ text: this.null, value: null });
      InputSelectItem.cast(options).to(this);
    }
    change() {
      if (typeof this.onChange === 'function') this.onChange(event);
      if (typeof this.onchange === 'function') this.onchange(event);
    }
    get styleSheet() {
      return `
        :scope {
          &:hover { border-color: #8492a6; }
          &:focus { border-color: #20a0ff; }
          &[disabled] {
            background-color: #eff2f7;
            border-color: #d3dce6;
            color: #bbb;
            cursor: not-allowed;
          }
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          vertical-align: middle;
          border: 1px solid #C0CCDA;
          background-color: transparent;
          border-radius: 5px;
          padding: .5em;
          font-size: 12px;
          min-width: 120px;
          height: 28px;
        }
      `;
    }
    get value() {
      if (!this.keepValueType) return this.element.value;
      let [ option ] = this.element.selectedOptions;
      return option && option.jinkela && option.jinkela.value;
    }
    set value(value = this.defaultValue) {
      this.$hasValue = true;
      if (value !== void 0) this.$value = this.element.value = value;
    }
  };

});
