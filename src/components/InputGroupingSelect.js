def((Input, InputSelect, SubGroupMap) => class extends Jinkela {
  get InputSelect() { return InputSelect; }
  get template() {
    return `
      <div>
        <jkl-input-select
          ref="select"
          options="{options}"
          readonly="{readonly}"
          onchange="{selectChange}"></jkl-input-select>
      </div>
    `;
  }
  init() {
    this.selectChange();
  }
  get selectChange() {
    let value = () => {
      let { depot } = this;
      let group = this.subGroupMap[this.select.value] || [];
      if (group.length) {
        let table = new SubGroupMap({ group, depot });
        this.table = this.table ? table.renderWith(this.table) : table.to(this);
      } else {
        if (this.table) this.element.removeChild(this.table.element);
        this.table = null;
      }
    };
    Object.defineProperty(this, 'selectChange', { value, configurable: true });
    return value;
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
  get styleSheet() {
    return `
      :scope {
        text-align: left;
      }
    `;
  }
});
