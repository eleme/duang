def((Item, TableCell) => class extends Item {
  get template() { return `<tr></tr>`; }
  init() {
    let { fieldMap } = this;
    let { fields = [], actions = [] } = depot.scheme;
    fields.forEach(field => {
      new TableCell(field, { value: fieldMap[field.key] }, this).renderTo(this);
    });
    if (actions.length) new TableCell({ actions, align: 'right' }, this).renderTo(this);
  }
});
