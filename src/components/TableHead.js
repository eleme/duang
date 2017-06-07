def((TableHeadCell) => class extends Jinkela {
  get template() { return '<thead><tr ref="tr"></tr></thead>'; }
  init() {
    let { depot = window.depot } = this;
    let { scheme, uParams } = depot;
    let fields = (scheme.fields || []).slice(0);
    if (scheme.actions && scheme.actions.length) {
      fields.push({ title: depot.getConst('操作'), nowrap: true });
    }
    TableHeadCell.cast(fields).to(this.tr);
    this.element.addEventListener('sort', e => {
      e.stopPropagation();
      uParams.orderBy = e.detail;
      location.hash = new UParams(uParams);
    });
  }
  get styleSheet() {
    return `
      :scope td {
        background: #eff2f7;
      }
    `;
  }
});
