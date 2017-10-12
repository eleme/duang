def((InputSelect, SubGroupMap) => class extends Jinkela {
  beforeParse(params) {
    this.options = params.options;
    this.readonly = params.readonly;
  }
  get InputSelect() { return InputSelect; }
  get template() {
    return `
      <div>
        <jkl-input-select ref="select"
          options="{options}"
          readonly="{readonly}"
          onchange="{selectChange}"
          depot="{depot}"></jkl-input-select>
        <div ref="container" class="container"></div>
      </div>
    `;
  }
  init() {
    if (!this.$hasValue) this.value = void 0;
    if (this.mode) this.container.classList.add(this.mode);
  }
  get selectChange() {
    let value = () => {
      let { depot } = this;
      let group = this.subGroupMap[this.select.value] || [];
      if (group.length) {
        let table = new SubGroupMap({ group, depot });
        this.table = this.table ? table.renderWith(this.table) : table.to(this.container);
      } else {
        if (this.table) this.table.element.remove();
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
        > .container {
          margin-top: 1em;
          &:empty { display: none; }
          &.line {
            margin: 0 0 0 1em;
            display: inline-block;
            vertical-align: top;
          }
        }
      }
    `;
  }
});
