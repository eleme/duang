def((Input, InputSelect, SubGroupMap) => class extends Jinkela {
  beforeParse(params) {
    this.options = params.options;
    this.readonly = params.readonly;
  }
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
    if (!this.$hasValue) this.value = void 0;
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
    let base = this.hideKey ? {} : { [this.aliasKey || '']: this.select.value };
    return Object.assign(base, this.table ? this.table.value : {});
  }
  set value(value = this.defaultValue) {
    this.$hasValue = true;
    if (value) this.select.value = value[this.aliasKey || ''];
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
