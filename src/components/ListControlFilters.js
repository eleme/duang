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
    let { filters = [] } = this.scheme;
    ListControlFiltersItem.cast(filters).renderTo(this);
  }
});
