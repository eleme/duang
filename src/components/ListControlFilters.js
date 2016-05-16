def((ListControlFiltersItem) => class extends Jinkela {
  get styleSheet() {
    return `
      :scope {
        float: left;
        text-align: left;
        margin-bottom: 1em;
      }
    `;
  }
  init() {
    let { scheme } = this;
    let { filters = [] } = scheme;
    ListControlFiltersItem.cast(filters, { scheme }).renderTo(this);
  }
});
