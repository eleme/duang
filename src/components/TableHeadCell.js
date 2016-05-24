def((Output, Item, TableRowActions) => class extends Item {
  get tagName() { return 'td'; }
  init() {
    if (this.align) this.element.align = this.align;
    this.element.innerHTML = this.title;
  }
  get styleSheet() {
    return `
      :scope {
        border: solid #e4e4e4;
        border-width: 1px 0;
        padding: .25em;
        white-space: nowrap;
      }
    `;
  }
});
