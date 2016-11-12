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
  }
  get tagName() { return 'table'; }
  get styleSheet() {
    return `
      :scope {
        break-inside: avoid-column;
        border-spacing: 1em;
        margin: 0 -1em  -1em -1em;
        font-size: inherit;
      }
    `;
  }
});
