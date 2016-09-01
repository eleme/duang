def((Input, InputSelect, SubGroupMap) => class extends Jinkela {
  init() {
    let { depot, groupingMode = 'table' } = this;
    let group = this.inputs || [];
    if (group.length) {
      let list = new SubGroupMap({ group, depot, tagName: groupingMode });
      this.list = this.list ? list.renderWith(this.list) : list.renderTo(this);
    } else {
      if (this.list) this.element.removeChild(this.list.element);
      this.list = null;
    }
  }
  get value() {
    return Object.assign({}, this.list ? this.list.value : {});
  }
  set value(value) {
    if (value === void 0) return;
    if (this.list) this.list.value = value;
  }
});
