def((TableRowActionsItem) => class extends Jinkela {
  init() {
    TableRowActionsItem.cast(this.actions, this).to(this);
  }
  get tagName() { return 'ul'; }
  get styleSheet() {
    return `
      :scope {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    `;
  }
});
