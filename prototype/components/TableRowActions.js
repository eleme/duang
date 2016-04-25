def((TableRowActionsItem) => class extends Jinkela {
  init() {
    let data = this.data.map(item => {
      item = Object.create(item);
      item.text = item.title;
      return item;
    });
    TableRowActionsItem.cast(data).renderTo(this);
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
