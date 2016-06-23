def((ListControl, Table, TableTip, Pager) => class extends Jinkela {
  load() {
    let { queryParams, scheme } = depot;
    if (!scheme) return location.hash = '';
    let { key } = scheme;
    let params = JSON.parse(UParams().params || '{}');
    key = key.replace(/:([^/]+)/g, ($0, $1) => params[$1]);
    return api(key + '?' + queryParams);
  }
  init() {
    let { scheme } = depot;
    new ListControl().renderTo(this);
    let table = new Table().renderTo(this);
    let { pageSize, fields = [] } = scheme;
    if (!fields.length) return; // Load data if "fields" exists
    let tip = new TableTip().renderTo(this);
    this.load().then(list => {
      table.render(list);
      tip.render(list);
      if (pageSize) new Pager({ list }).renderTo(this);
    }, error => {
      tip.render(error);
    });
  }
});
