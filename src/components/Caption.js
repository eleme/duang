def((Output) => class extends Jinkela {
  init() {
    let params = {};
    let { scheme, uParams } = depot;
    let { page, where } = uParams;
    if (scheme.pageSize) {
      params.limit = scheme.pageSize;
      params.offset = scheme.pageSize * (page - 1 || 0);
    }
    if (where) params.where = where;
    Output.cast(scheme.caption, { params }).to(this);
  }
  get styleSheet() {
    return `
      :scope {
        text-align: left;
      }
    `;
  }
});
