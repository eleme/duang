def((Scheme, ListControl, Table, TableTip, Pager) => class extends Scheme {
  load() {
    let { scheme } = this;
    if (!scheme) return location.hash = '';
    return api(scheme.key + '?' + this.queryParams);
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
