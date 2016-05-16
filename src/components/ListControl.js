def((ListControlItem, ListControlFilters) => class extends Jinkela {
  get styleSheet() {
    return `
      :scope {
        text-align: right;
        margin: 1em;
      }
    `;
  }
  init() {
    new ListControlFilters({ scheme: this.scheme }).renderTo(this);
    let { scheme } = this;
    let { operations = [] } = scheme;
    ListControlItem.cast(operations, { scheme }).renderTo(this);
  }
});
