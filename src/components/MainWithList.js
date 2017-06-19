def((ListControl, Table, TableTip, Pagination) => class extends Jinkela {
  get ListControl() { return ListControl; }
  get Table() { return Table; }
  get TableTip() { return TableTip; }
  get Pagination() { return Pagination; }
  get template() {
    return `
      <div>
        <jkl-list-control depot="{depot}"></jkl-list-control>
        <jkl-table if="{list}" depot="{depot}" data="{list}"></jkl-table>
        <jkl-table-tip data="{list}" error="{error}"></jkl-table-tip>
        <meta ref="pagination" />
      </div>
    `;
  }
  get styleSheet() {
    return `
      :scope {
        width: 100%;
      }
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
  }
  async init() {
    let { scheme } = this.depot;
    let { fields = [] } = scheme;
    if (fields && fields.length) {
      try {
        let [ data, count ] = await Promise.all([ this.loadData(), this.loadCount() ]);
        if (!(data instanceof Array)) throw new Error('返回结果必须是数组');
        this.list = data;
        this.count = typeof count === 'number' ? count : count.count;
        this.ready();
      } catch (error) {
        this.error = error;
      }
    } else {
      this.list = 'EMPTY_FIELDS';
    }
  }
});
