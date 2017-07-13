def((Item, Value) => {

  class InputCheckboxItem extends Item {
    init() {
      if (this.readonly) this.input.setAttribute('disabled', 'disabled');
    }
    get template() {
      return `
        <label>
          <span>{text}</span>
          <input ref="input" type="checkbox" name="n" value="{value}" />
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
      let list = Object.keys(options).map(key => ({ value: key, text: options[key] }));
      if (list.length > 1 && !readonly) this.toggleItem = new InputCheckboxItem({ readonly, text: '全选' });
      this.list = InputCheckboxItem.cast(list, { readonly }).to(this);
      this.element.addEventListener('change', event => {
        if (this.toggleItem && event.target === this.toggleItem.element) {
          this.toggleAll(e.target.checked);
        } else {
          this.toggleItem.checked = this.list.every(item => item.checked);
        }
      });
      this.value = this.$value || this.defaultValue;
    }
    toggleAll(isChecked) {
      this.list.forEach(item => (item.checked = isChecked));
    }
    set value(value = this.defaultValue || []) {
      this.$value = value;
      let set = new Set(value);
      this.list.forEach(item => (item.checked = set.has(item.value)));
    }
    get value() {
      return this.list.filter(item => item.checked).map(item => item.input.value);
    }
  };

});
