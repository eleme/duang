def((Output, Item, TableRowActions) => class extends Item {
  get tagName() { return `td`; }
  init() {
    let { align, value, component, args, actions, scheme, fieldMap } = this;
    if (align) this.element.align = align;
    switch (true) {
      case !!component: return new Output({ component, args, value, fieldMap }).renderTo(this);
      case !!actions: return new TableRowActions({ actions, scheme, fieldMap }).renderTo(this);
      default: this.element.innerHTML = value;
    }
  }
  get styleSheet() {
    return `
      :scope {
        border: solid #e4e4e4;
        border-width: 1px 0;
        padding: .1em .5em;
      }
    `;
  }
});
