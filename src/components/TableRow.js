def((Item, TableCell) => class extends Item {
  get template() { return `<tr></tr>`; }
  init() {
    let { depot = window.depot } = this;
    let { fieldMap } = this;
    let { fields = [], actions = [] } = depot.scheme;
    fields.forEach(field => {
      new TableCell(field, { value: fieldMap[field.key] }, this).to(this);
    });
    if (actions.length) new TableCell({ actions, align: 'right' }, this).to(this);
  }
  get styleSheet() {
    return `
      :scope:hover {
        background: #F9FAFC;
        transition: background 200ms ease;
      }
    `;
  }
});
