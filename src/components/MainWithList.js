def((ListControl, Table, TableTip, Pagination) => class extends Jinkela {
  get ListControl() { return ListControl; }
  get Table() { return Table; }
  get TableTip() { return TableTip; }
  get Pagination() { return Pagination; }
  get template() {
    return `
      <div>
        <jkl-list-control depot="{depot}"></jkl-list-control>
        <jkl-table depot="{depot}" data="{list}"></jkl-table>
        <jkl-table-tip data="{list}" error="{error}"></jkl-table-tip>
        <meta ref="pagination" />
      </div>
    `;
  }
  set count(value) {
    this.$count = value;
    this.visible = value === value;
  }
  get count() { return this.$count; }
  init() {
    let { scheme } = this.depot;
    if (!scheme) return (location.hash = '');
  }
  loadData() {
    let { queryParams, resolvedKey } = this.depot;
    return api(resolvedKey + '?' + queryParams);
  }
  loadCount() {
    if (!this.depot.scheme.countable) return Promise.resolve(0 / 0);
    let { queryParams, resolvedKey } = this.depot;
    return api(resolvedKey + '/count' + '?' + queryParams).catch(() => 0 / 0);
  }
  ready() {
    let { depot, list, count } = this;
    this.pagination = new Pagination({ depot, list, count });
  }
  beforeParse(params) {
    this.depot = params.depot || depot;
    let { scheme } = this.depot;
    let { fields } = scheme;
    if (fields.length) {
      Promise.all([ this.loadData(), this.loadCount() ]).then(([ data, count ]) => {
        this.list = data;
        this.count = typeof count === 'number' ? count : count.count;
        this.ready();
      }).then(error => {
        this.error = error;
      });
    } else {
      setTimeout(() => {
        this.list = 'EMPTY_FIELDS';
      });
    }
  }
});
