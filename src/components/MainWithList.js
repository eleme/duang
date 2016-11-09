def((ListControl, Table, TableTip, Pager) => class extends Jinkela {
  load() {
    let { queryParams, scheme, resolvedKey } = depot;
    if (!scheme) return location.hash = '';
    return api(resolvedKey + '?' + queryParams);
  }
  init() {
    let { scheme } = depot;
    new ListControl().to(this);
    let table = new Table().to(this);
    let { pageSize, fields = [] } = scheme;
    if (!fields.length) return; // Load data if "fields" exists
    let tip = new TableTip().to(this);
    this.load().then(list => {
      table.render(list);
      tip.render(list);
      if (pageSize) new Pager({ list }).to(this);
    }, error => {
      tip.render(error);
    });
  }
});
