def((Output) => class extends Jinkela {
  init() {
    let params = {};
    let { scheme, uParams, pageSize } = depot;
    let { page, where } = uParams;
    if (pageSize) {
      params.limit = pageSize;
      params.offset = pageSize * (page - 1 || 0);
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
