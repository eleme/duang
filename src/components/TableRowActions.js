def((TableRowActionsItem) => class extends Jinkela {
  init() {
    TableRowActionsItem.cast(this.actions, this).renderTo(this);
  }
  get template() { return '<ul></ul>'; }
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
