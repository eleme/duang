def((ListControlItem) => class extends Jinkela {
  get styleSheet() {
    return `
      :scope {
        text-align: right;
        margin-bottom: 1em;
        overflow: hidden;
      }
    `;
  }
  init() {
    let { depot } = this;
    let { scheme } = depot;
    let { operations = [] } = scheme;
    ListControlItem.cast(operations, { depot }).to(this);
    if (!operations.length) this.element.style.display = 'none';
  }
});
