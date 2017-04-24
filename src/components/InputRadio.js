def((Item, Value) => {

  class InputRadioItem extends Item {
    init() {
      if (this.readonly) this.input.setAttribute('disabled', 'disabled');
    }
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
          &:last-child {
            margin-right: 0;
          }
        }
      `;
    }
  }

  return class extends Value {
    get template() { return '<form></form>'; }
    get styleSheet() {
      return `
        :scope {
          margin: 0;
        }
      `;
    }
    init() {
      let { options, readonly } = this;
      let list = Object.keys(options).map(key => {
        return { value: key, text: options[key] };
      });
      this.list = InputRadioItem.cast(list, { readonly }).to(this);
      this.value = this.value;
    }
    set value(value = this.defaultValue) {
      this.list.forEach(item => (item.checked = item.value === value));
    }
    get value() {
      let found = this.list.find(item => item.checked);
      return found && found.input.value;
    }
  };

});
