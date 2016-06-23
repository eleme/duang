def((TableHeadCell) => class extends Jinkela {
  get template() { return `<thead><tr ref="tr"></tr></thead>`; }
  init() {
    let { scheme } = depot;
    let fields = (scheme.fields || []).slice(0);
    if (scheme.actions && scheme.actions.length) {
      fields.push({ title: scheme.actionsTitle || 'Actions', align: 'right' });
    }
    TableHeadCell.cast(fields).renderTo(this.tr);
  }
});
