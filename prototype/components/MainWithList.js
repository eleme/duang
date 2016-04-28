def((Scheme, Table, TableTip, Pager) => class extends Scheme {
  load() {
    let params = {};
    let { scheme } = this;
    if (scheme.pageSize) {
      params.limit = scheme.pageSize;
      params.offset = scheme.pageSize * (new UParams().page - 1 || 0);
    }
    return fetch(scheme.api + '?' + new UParams(params), { credentials: 'include' }).then(response => {
      let result = response.json();
      if (response.status >= 400) throw result;
      return result;
    });
  }
  error(error) {
    alert(error.message || 'Unknown Error');
  }
  init() {
    let scheme = this.scheme;
    this.$data = this.load();
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
