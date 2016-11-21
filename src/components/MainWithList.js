def((ListControl, Table, TableTip, Pager) => class extends Jinkela {
  get ListControl() { return ListControl; }
  get Table() { return Table; }
  get TableTip() { return TableTip; }
  get Pager() { return Pager; }
  get template() {
    return `
      <div>
        <jkl-list-control depot="{depot}"></jkl-list-control>
        <jkl-table depot="{depot}" data="{list}"></jkl-table>
        <jkl-table-tip data="{list}" error="{error}"></jkl-table-tip>
        <jkl-pager depot="{depot}" data="{list}" pagesize="{pageSize}"></jkl-pager>
      </div>
    `;
  }
  load() {
    let { queryParams, scheme, resolvedKey } = this.depot;
    if (!scheme) return location.hash = '';
    return api(resolvedKey + '?' + queryParams);
  }
  beforeParse(params) {
    this.depot = params.depot || depot;
    let { scheme } = this.depot;
    let { pageSize, fields = [] } = scheme;
    this.pageSize = pageSize;
    if (!fields.length) return; // Load data if "fields" exists
    this.load().then(list => {
      this.list = list;
    }, error => {
      this.error = error;
    });
  }
});
