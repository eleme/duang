def((FormItem, FormItemWithDiv) => class extends Jinkela {
  get value() {
    return this.inputs.reduce((base, item) => {
      base[item.key] = item.value;
      return base;
    }, {});
  }
  set value(value) {
    this.inputs.forEach(item => {
      item.value = value[item.key];
    });
  }
  init() {
    let { group, depot } = this;
    let { id } = depot;
    let action = id ? 'edit' : 'create';
    group = JSON.parse(JSON.stringify(group)).filter(item => item[action] !== 'none');
    group.forEach((item) => {
      if (item[action] === 'readonly') {
        if (!item.args) item.args = {};
        item.args.readonly = true;
      }
    });
    let Item = this.tagName === 'table' ? FormItem : FormItemWithDiv;
    this.inputs = Item.cast(group).to(this);
    if (this.horizontal) this.element.setAttribute('data-horizontal', this.horizontal);
  }
  get tagName() { return 'table'; }
  get styleSheet() {
    return `
      div:scope {
        white-space: nowrap;
      }
      :scope {
        font-size: 14px;
        margin-top: 1em;
        border-collapse: collapse;
        &[data-horizontal] {
          margin-top: 0;
          display: inline-table;
          vertical-align: middle;
        }
      }
    `;
  }
});
