def((Item) => {

  class InputSelectItem extends Item {
    get tagName() { return 'option'; }
    init() {
      this.element.setAttribute('value', this.value);
      this.element.textContent = this.text;
    }
  }

  return class extends Jinkela {
    get tagName() { return `select`; }
    init() {
      this.element.addEventListener('change', event => this.change(event));
    }
    get readonly() { return this.element.hasAttribute('disabled'); }
    set readonly(value) {
      if (value) {
        this.element.setAttribute('disabled', 'dsabled');
      } else {
        this.element.removeAttribute('disabled');
      }
    }
    set options(options) {
      while (this.element.firstChild) this.element.firstChild.remove();
      if (!options) return;
      if (!(options instanceof Array)) {
        options = Object.keys(options).map(key => ({ text: options[key], value: key }));
      }
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
    get value() { return this.element.value; }
    set value(value) { this.element.value = value; }
  };

});
