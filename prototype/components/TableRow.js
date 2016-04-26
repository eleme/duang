def((Item, TableCell) => class extends Item {
  get template() { return `<tr></tr>`; }
  init() {
    let { scheme, fields, id } = this;
    fields = [...fields];
    if (scheme.actions) fields.push({ type: 'actions', value: scheme.actions, align: 'right' });
    TableCell.cast(fields || [], { scheme, id: this.id }).renderTo(this);
  }
});
