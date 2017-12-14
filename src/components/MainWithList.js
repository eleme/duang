def((Output, ListFlex, ListOperations, ListHeaders, ListFilters, Table, TableTip, Pagination) => class extends Jinkela {

  get ListFlex() { return ListFlex; }
  get ListOperations() { return ListOperations; }
  get ListFilters() { return ListFilters; }
  get ListHeaders() { return ListHeaders; }
  get Table() { return Table; }
  get TableTip() { return TableTip; }
  get Pagination() { return Pagination; }

  get template() {
    return `
      <div on-filtertoggle="{filterToggle}">
        <jkl-list-flex>
          <jkl-list-headers depot="{depot}"></jkl-list-headers>
          <jkl-list-operations depot="{depot}"></jkl-list-operations>
        </jkl-list-flex>
        <jkl-list-flex ref="filterContainer" hidden-default="{isFilterHiddenDefault}">
          <jkl-list-filters depot="{depot}"></jkl-list-filters>
        </jkl-list-flex>
        <jkl-table if="{list}" depot="{depot}" data="{list}" ref="table"></jkl-table>
        <jkl-table-tip ref="tip" data="{list}" error="{error}"></jkl-table-tip>
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

  filterToggle() {
    this.filterContainer.toggle();
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
    if ('pageSize' in depot.scheme) this.pagination = new Pagination({ depot, list, count });
  }

  beforeParse(params) {
    this.depot = params.depot || depot;
    let { scheme } = this.depot;
    void scheme;
    this.isFilterHiddenDefault = this.depot.params.filterState === 'folded';
  }

  init() {
    Object.defineProperty(this.depot, 'main', { configurable: true, value: this });
    let { scheme, where } = this.depot;
    let { noWhere, fields = [] } = scheme;
    if (noWhere && Object.keys(where).length === 0) {
      if (noWhere === true) {
        this.tip.hide();
      } else {
        this.tip.text = Output.createAny(noWhere);
      }
    } else {
      if (fields && fields.length) {
        return Promise.all([ this.loadData(), this.loadCount() ]).then(([ data, count ]) => {
          if (!(data instanceof Array)) throw new Error('返回结果必须是数组');
          this.list = data;
          this.count = typeof count === 'number' ? count : count.count;
          this.ready();
        }).catch(error => {
          this.error = error;
        });
      }
    }
  }

});
