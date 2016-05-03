def((FormSubmit, FormItem) => class extends Jinkela {
  get template() { return '<table></table>'; }
  init() {
    this.list = FormItem.cast(this.scheme.inputs || []).renderTo(this);
    new FormSubmit({ scheme: this.scheme, form: this }).renderTo(this);
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
      item.value = data[item.key];
    });
  }
  get value() {
    return this.list.reduce((result, item) => {
      result[item.key] = item.value;
      return result;
    }, Object.create(null));
  }
});
