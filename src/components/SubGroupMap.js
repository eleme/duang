def((FormItem, FormItemWithDiv) => class extends Jinkela {
  set value(data) {
    if (!data) return;
    this.inputs.forEach(item => {
      switch (item.squash) {
        case 'direct':
          item.value = Object.assign({ '': data[item.key] }, data);
          break;
        default:
          item.value = data[item.key];
      }
    });
  }
  get value() {
    return this.inputs.reduce((result, item) => {
      let { value } = item;
      switch (item.squash) {
        case 'direct':
          result[item.key] = value[''];
          Object.keys(value).filter(key => key).forEach(key => (result[key] = value[key]));
          break;
        default:
          result[item.key] = value;
      }
      return result;
    }, Object.create(null));
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
