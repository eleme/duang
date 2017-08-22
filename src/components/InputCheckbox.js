def((Item, Value) => {

  return class extends Value {
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          vertical-align: middle;
          > * {
            vertical-align: top;
          }
        }
      `;
    }
    init() {
      this.element.addEventListener('change', event => this.change(event));
      let { options, readonly } = this;
      let list = Object.keys(options).map(key => ({ value: key, text: options[key] }));
      if (list.length > 1 && !readonly) this.toggleItem = new Checkbox({ readonly, text: '全选' }).to(this);
      this.list = Checkbox.from(list.map(item => Object.assign({ readonly }, item))).to(this);
      this.value = this.$value || this.defaultValue;
    }
    change(event) {
      if (this.changing === true) return;
      this.changing = true;
      if (this.toggleItem && this.toggleItem.element === event.target) {
        this.list.forEach(item => (item.checked = this.toggleItem.checked));
      } else {
        this.updateTheAll();
      }
      this.changing = false;
    }
    updateTheAll() {
      if (this.toggleItem) this.toggleItem.checked = this.list.every(item => item.checked);
    }
    set value(value = this.defaultValue || []) {
      this.$value = value;
      let set = new Set(value);
      this.list.forEach(item => (item.checked = set.has(item.value)));
      this.updateTheAll();
    }
    get value() {
      return this.list.filter(item => item.checked).map(item => item.value);
    }
  };

});
