def((TableHeadCell) => class extends Jinkela {
  get template() { return `<thead><tr ref="tr"></tr></thead>`; }
  init() {
    let { depot = window.depot } = this;
    let { scheme } = depot;
    let fields = (scheme.fields || []).slice(0);
    if (scheme.actions && scheme.actions.length) {
      fields.push({ title: depot.getConst('Actions'), nowrap: true });
    }
    TableHeadCell.cast(fields).to(this.tr);
  }
  get styleSheet() {
    return `
      :scope td {
        background: #eff2f7;
      }
    `;
  }
});
