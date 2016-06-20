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
    new ListControl({ scheme }).renderTo(this);
    let table = new Table({ scheme }).renderTo(this);
    // Load data if "fields" exists
    if (scheme.fields && scheme.fields.length) {
      let tip = new TableTip().renderTo(this);
      this.$data = this.load();
      this.$data.then(list => {
        table.render(list);
        tip.render(list);
        new Pager({ scheme, list }).renderTo(this);
      }, error => {
        tip.render(error);
      });
    }
  }
});
