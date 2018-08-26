def((SubGroupMap, Checkbox) => class extends Jinkela {
  get Checkbox() { return Checkbox; }

  beforeParse(params) {
    this.options = { true: params.label };
  }

  get template() {
    return `
      <div>
        <jkl-checkbox ref="input"
          text=""
          readonly="{readonly}"
          on-change="{change}"></jkl-checkbox>
        <div ref="container" class="container"></div>
      </div>
    `;
  }

  init() {
    if (!this.$hasValue) this.value = void 0;
    this.container.classList.add('line');
  }

  get inputValue() { return this.input.checked; }
  set inputValue(value) { this.input.checked = value; }

  get change() {
    let value = () => {
      let { depot } = this;
      let group = this.inputValue ? this.subGroup : [];
      if (group.length) {
        let table = new SubGroupMap({ group, depot });
        this.table = this.table ? table.renderWith(this.table) : table.to(this.container);
      } else {
        if (this.table) this.table.element.remove();
        this.table = null;
      }
    };
    Object.defineProperty(this, 'change', { value, configurable: true });
    return value;
  }

  get value() {
    let base = this.hideKey ? {} : { [this.aliasKey || '']: this.inputValue };
    return Object.assign(base, this.table ? this.table.value : {});
  }

  set value(value = this.defaultValue) {
    this.$hasValue = true;
    if (value) this.inputValue = value[this.aliasKey || ''];
    this.change();
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
