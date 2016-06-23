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
    new ListControlFilters().renderTo(this);
    let { scheme } = depot;
    let { operations = [] } = scheme;
    ListControlItem.cast(operations).renderTo(this);
  }
});
