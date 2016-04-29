def((TableRowActionsItem) => class extends Jinkela {
  init() {
    TableRowActionsItem.cast(this.data, { scheme: this.scheme, id: this.id }).renderTo(this);
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
