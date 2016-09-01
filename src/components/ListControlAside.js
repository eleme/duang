def((ListControlItem) => class extends Jinkela {
  get styleSheet() {
    return `
      :scope {
        text-align: right;
      }
    `;
  }
  init() {
    let { scheme } = depot;
    let { operations = [] } = scheme;
    ListControlItem.cast(operations).renderTo(this);
  }
});
