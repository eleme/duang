def((FormItem) => class extends Jinkela {
  get template() { return '<table></table>'; }
  init() {
    this.list = FormItem.cast(this.scheme.inputs || []).renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        margin: 1em;
      }
    `;
  }
  set value(data) {
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
