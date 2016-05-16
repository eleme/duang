def((Output, Item, TableRowActions) => class extends Item {
  get tagName() { return `td`; }
  init() {
    if (this.align) this.element.align = this.align;
    let { value } = this;
    let { component, args } = this;
    if (component) {
      new Output({ component, args, value }).renderTo(this);
    } else {
      switch (this.type) {
        case 'actions':
          new TableRowActions({ data: value, scheme: this.scheme, id: this.id }).renderTo(this);
          break;
        default:
          this.element.innerHTML = value;
      }
    }
  }
  get styleSheet() {
    return `
      :scope {
        border: solid #e4e4e4;
        border-width: 1px 0;
      }
    `;
  }
});
