def((Item, Value) => {

  return class extends Value {
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          vertical-align: middel;
        }
      `;
    }
    change(event) {
      if (this.changing) return;
      this.changing = true;
      this.list.forEach(item => (item.checked = item.element === event.target));
      this.changing = false;
    }
    init() {
      this.element.addEventListener('change', event => this.change(event));
      let { options, readonly } = this;
      let list = Object.keys(options).map(key => ({ value: key, text: options[key] }));
      this.list = Radio.from(list, { readonly }).to(this);
      if (!this.$hasValue) this.value = void 0;
    }
    set value(value = this.defaultValue) {
      this.$hasValue = true;
      if (this.list.length === 0) return;
      if (!this.list.some(item => (item.checked = item.value === value))) this.list[0].checked = true;
    }
    get value() {
      let found = this.list.find(item => item.checked);
      return found && found.value;
    }
  };

});
