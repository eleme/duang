def((Checkbox, Item, Output, Value) => {

  return class extends Value {
    get styleSheet() {
      return `
        :scope {
          display: inline-block;
          vertical-align: middle;
          > * {
            white-space: nowrap;
            vertical-align: top;
          }
        }
      `;
    }
    init() {
      this.element.addEventListener('change', event => this.change(event));
      let { options, readonly } = this;
      let list = options instanceof Array ? options : Object.keys(options).map(key => ({ value: key, text: options[key] }));
      if (list.length > 1 && !readonly) this.toggleItem = new Checkbox({ readonly, text: '全选' }).to(this);
      list.forEach(item => {
        item.text = Output.createAny(item.text);
      });
      this.list = Checkbox.from(list.map(item => Object.assign({ readonly }, item))).to(this);
      for (let item of this.list) this.element.insertBefore(new Text(' '), item.element); // 为了自动换行强行插入一堆空文本节点
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
      if (typeof this.onchange === 'function') this.onchange();
    }
    updateTheAll() {
      if (this.toggleItem) this.toggleItem.checked = this.list.every(item => item.checked);
    }
    set value(value = this.defaultValue || []) {
      this.$value = value;
      if (value && typeof value === 'object' && value.all === true) { // 默认全选
        if (this.list) this.list.forEach(item => (item.checked = true));
      } else {
        let set = new Set(value);
        if (this.list) this.list.forEach(item => (item.checked = set.has(item.value)));
      }
      this.updateTheAll();
    }
    get value() {
      if (this.list) return this.list.filter(item => item.checked).map(item => item.value);
    }
  };

});
