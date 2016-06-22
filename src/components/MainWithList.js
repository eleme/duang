def((Scheme, ListControl, Table, TableTip, Pager) => class extends Scheme {
  load() {
    let { scheme, queryParams } = this;
    if (!scheme) return location.hash = '';
    let { key } = scheme;
    let params = JSON.parse(UParams().params || '{}');
    key = key.replace(/:([^/]+)/g, ($0, $1) => params[$1]);
    return api(key + '?' + queryParams);
  }
  init() {
    let { scheme } = this;
    new ListControl({ scheme }).renderTo(this);
    let table = new Table({ scheme }).renderTo(this);
    let { pageSize, fields = [] } = scheme;
    if (!fields.length) return; // Load data if "fields" exists
    let tip = new TableTip().renderTo(this);
    this.load().then(list => {
      table.render(list);
      tip.render(list);
      if (pageSize) new Pager({ scheme, list }).renderTo(this);
    }, error => {
      tip.render(error);
    });
  }
});
