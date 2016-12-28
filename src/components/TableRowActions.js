def((TableRowActionsItem) => class extends Jinkela {
  init() {
    let { fieldMap } = this;
    TableRowActionsItem.cast(this.actions.filter(action => {
      return condition(action.conditions, fieldMap);
    }), this).to(this);
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
