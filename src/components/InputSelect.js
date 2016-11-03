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
      let { options } = this;
      if (!(options instanceof Array)) {
        options = Object.keys(options).map(key => ({ text: options[key], value: key }));
      }
      InputSelectItem.cast(options).renderTo(this);
      this.element.addEventListener('change', event => this.change(event));
      if (this.readonly) this.element.setAttribute('disabled', 'dsabled');
    }
    change() {
      if (typeof this.onChange === 'function') this.onChange(event);
    }
    get styleSheet() {
      return `
        :scope {
          &:focus { border-color: #20A0FF; }
          transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          vertical-align: middle;
          border: 1px solid #C0CCDA;
          background-color: transparent;
          border-radius: 5px;
          padding: .5em;
          font-size: 13px;
          min-width: 120px;
          height: 28px;
        }
      `;
    }
    get value() { return this.element.value; }
    set value(value) { this.element.value = value; }
  };

});
