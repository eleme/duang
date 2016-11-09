def((Input, InputSelect, SubGroupMap) => class extends Jinkela {
  init() {
    let { options, readonly } = this;
    const onChange = event => this.selectChange(event);
    this.select = new InputSelect({ options, readonly, onChange }).to(this);
    this.selectChange();
  }
  selectChange() {
    let { depot, horizontal } = this;
    let group = this.subGroupMap[this.select.value] || [];
    if (group.length) {
      let table = new SubGroupMap({ group, horizontal, depot });
      this.table = this.table ? table.renderWith(this.table) : table.to(this);
    } else {
      if (this.table) this.element.removeChild(this.table.element);
      this.table = null;
    }
  }
  get value() {
    let base = this.hideKey ? {} : { '': this.select.value };
    return Object.assign(base, this.table ? this.table.value : {});
  }
  set value(value) {
    if (value === void 0) return;
    this.select.value = value[''];
    this.selectChange();
    if (this.table) this.table.value = value;
  }
});
