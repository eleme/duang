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
    }
    change() {
      if (typeof this.onChange === 'function') this.onChange(event);      
    }
    get styleSheet() {
      return `
        :scope {
          border: 1px solid #ccc;        
          border-radius: 5px;
          padding: .5em;
        }
      `;
    }
    get value() { return this.element.value; }
    set value(value) { this.element.value = value; }
  };

});
