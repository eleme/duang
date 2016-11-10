def((ListControl, Table, TableTip, Pager) => class extends Jinkela {
  get ListControl() { return ListControl; }
  get Table() { return Table; }
  get TableTip() { return TableTip; }
  get Pager() { return Pager; }
  get template() {
    return `
      <div>
        <jkl-list-control></jkl-list-control>
        <jkl-table data="{list}"></jkl-table>
        <jkl-table-tip data="{list}" error="{error}"></jkl-table-tip>
        <jkl-pager data="{list}" pagesize="{pageSize}"></jkl-pager>
      </div>
    `;
  }
  load() {
    let { queryParams, scheme, resolvedKey } = depot;
    if (!scheme) return location.hash = '';
    return api(resolvedKey + '?' + queryParams);
  }
  init() {
    let { scheme } = depot;
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
