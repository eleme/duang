def((Scheme, ListControl, Table, TableTip, Pager) => class extends Scheme {
  load() {
    let params = {};
    let { scheme } = this;
    let { page, where } = new UParams();
    if (scheme.pageSize) {
      params.limit = scheme.pageSize;
      params.offset = scheme.pageSize * (page - 1 || 0);
    }
    if (where) params.where = where;
    return api(scheme.key + '?' + new UParams(params));
  }
  error(error) {
    alert(error.message || 'Unknown Error');
  }
  init() {
    let scheme = this.scheme;
    this.$data = this.load();
    new ListControl({ scheme }).renderTo(this);
    let table = new Table({ scheme }).renderTo(this);
    let tip = new TableTip().renderTo(this);
    this.$data.then(list => {
      table.render(list);
      tip.render(list);
      new Pager({ scheme, list }).renderTo(this);
    }, error => {
      tip.render(error);
    });
  }
});
