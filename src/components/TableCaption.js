def((Output) => class extends Jinkela {
  get tagName() { return 'caption'; }
  init() {
    let params = {};
    let { scheme } = this;
    let { page, where } = new UParams();
    if (scheme.pageSize) {
      params.limit = scheme.pageSize;
      params.offset = scheme.pageSize * (page - 1 || 0);
    }
    if (where) params.where = where;
    Output.cast(scheme.caption, { scheme, params }).renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        /* color: red; */
      }
    `;
  }
});
