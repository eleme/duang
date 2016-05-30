def((FormSubmit, FormItem) => class extends Jinkela {
  get tagName() { return 'table'; }
  init() {
    let { scheme } = this;
    let { inputs = [] } = scheme;
    let { id } = new UParams();
    let action = id ? 'edit' : 'create';
    inputs = JSON.parse(JSON.stringify(inputs)).filter(item => item[action] !== 'none');
    inputs.forEach((item) => {
      if (item[action] === 'readonly') {
        if (!item.args) item.args = {};
        item.args.readonly = true;
      }
    });
    this.list = FormItem.cast(inputs, { scheme }).renderTo(this);
    new FormSubmit({ scheme, form: this }).renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        font-size: 14px;
        margin: 1em;
        width: calc(100% - 2em);
        border-collapse: collapse;
      }
    `;
  }
  set value(data) {
    if (!data) return;
    this.list.forEach(item => {
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
    return this.list.reduce((result, item) => {
      let { value } = item;
      switch (item.squash) {
        case 'direct':
          result[item.key] = value[''];
          Object.keys(value).filter(key => key).forEach(key => result[key] = value[key]);
          break;
        default:
          result[item.key] = value;
      }
      return result;
    }, Object.create(null));
  }
});
