def((Input, InputSelect, SubGroupMap) => class extends Jinkela {
  init() {
    let { depot, horizontal } = this;
    let group = this.inputs || [];
    if (group.length) {
      let table = new SubGroupMap({ group, horizontal, depot });
      this.table = this.table ? table.renderWith(this.table) : table.renderTo(this);
    } else {
      if (this.table) this.element.removeChild(this.table.element);
      this.table = null;
    }
  }
  get value() {
    return Object.assign({}, this.table ? this.table.value : {});
  }
  set value(value) {
    if (value === void 0) return;
    if (this.table) this.table.value = value;
  }
});
