def((FormSubmit, FormItem, Alert) => class extends Jinkela {
  get FormSubmit() { return FormSubmit; }
  get Alert() { return Alert; }
  get template() {
    return `
      <div>
        <div ref="notice"></div>
        <div ref="columns">
          <table ref="table"></table>
        </div>
        <jkl-form-submit if="{listLength}" depot="{depot}" form="{form}"></jkl-form-submit>
        <h3 if-not="{listLength}">并没有什么东西可以编辑</h3>
      </div>
    `;
  }
  init() {
    let { depot } = this;
    let { id, scheme } = depot;
    let { inputs = [], columns } = scheme;
    this.listLength = inputs.length;
    let action = id ? 'edit' : 'create';
    inputs = JSON.parse(JSON.stringify(inputs)).filter(item => item[action] !== 'none');
    inputs.forEach((item) => {
      if (item[action] === 'readonly') {
        if (!item.args) item.args = {};
        item.args.readonly = true;
      }
      if (item[action] === 'hidden') item.hidden = true;
    });
    this.list = FormItem.cast(inputs, { depot });
    this.form = this;
    this.$promise = Promise.all(this.list.map(item => item.$promise)).then(() => {
      this.list.forEach(item => item.to(this.table));
    });
    if (columns > 1) {
      this.columns.dataset.columns = columns;
      this.columns.style.columns = columns;
    }
    if (depot.scheme.alert) {
      this.$promise.then(() => {
        new Alert(Object.assign({ form: this }, depot.scheme.alert)).to(this.notice);
      });
    }
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
          Object.keys(value).filter(key => key).forEach(key => (result[key] = value[key]));
          break;
        default:
          result[item.key] = value;
      }
      return result;
    }, Object.create(null));
  }
  get styleSheet() {
    return `
      :scope {
        padding: 2em;
        > [ref=columns] {
          > table {
            border-spacing: 1em;
            margin: -1em 0;
            font-size: inherit;
          }
        }
      }
    `;
  }
});
