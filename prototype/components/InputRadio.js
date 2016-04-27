def((Item, Value) => {

  class InputRadioItem extends Item {
    get template() {
      return `
        <label>
          <span>{text}</span>
          <input ref="input" type="radio" name="n" value="{value}" />
        </label>
      `;
    }
    get checked() { return this.input.checked; }
    set checked(value) { this.input.checked = value; }
    get styleSheet() {
      return `
        :scope {
          margin-right: 1em;
        }
      `;
    }
  }

  return class extends Value {
    get template() { return `<form></form>`; }
    init() {
      let list = Object.keys(this.options).map(key => {
        return { value: key, text: this.options[key] };
      });
      this.list = InputRadioItem.cast(list).renderTo(this);
    }
    set value(value) {
      let set = new Set(value);
      this.list.forEach(item => item.checked = set.has(item.value));
    }
    get value() {
      return this.list.filter(item => item.checked).map(item => item.input.value) + '';
    }
  };

});
