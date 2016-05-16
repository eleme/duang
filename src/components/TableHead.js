def((TableHeadCell) => class extends Jinkela {
  get template() { return `<thead><tr ref="tr"></tr></thead>`; }
  init() {
    let { scheme } = this;
    let fields = [...scheme.fields];
    if (scheme.actions && scheme.actions.length) {
      fields.push({ title: scheme.actionsTitle || 'Actions', align: 'right' });
    }
    TableHeadCell.cast(fields, { scheme }).renderTo(this.tr);
  }
});
