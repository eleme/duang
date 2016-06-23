def((Output) => class extends Jinkela {
  get tagName() { return 'caption'; }
  init() {
    let params = {};
    let { scheme } = depot;
    let { page, where } = new UParams();
    if (scheme.pageSize) {
      params.limit = scheme.pageSize;
      params.offset = scheme.pageSize * (page - 1 || 0);
    }
    if (where) params.where = where;
    Output.cast(scheme.caption, { params }).renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        text-align: left;
      }
    `;
  }
});
