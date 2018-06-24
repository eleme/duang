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
        <jkl-table-tip ref="tip" data="{list}" error="{error}" depot="{depot}"></jkl-table-tip>
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

  beforeParse(params) {
    this.depot = params.depot || depot;
    let { scheme } = this.depot;
    void scheme;
    this.isFilterHiddenDefault = this.depot.params.filterState === 'folded';
  }

  initData() {
    return Promise.resolve().then(() => {
      let { scheme, where } = this.depot;
      let { noWhere, fields = [] } = scheme;
      if (!fields || !fields.length) throw new Error('字段未配置');
      // 如果设置了 noWhere，那么在 where 为空时将不发起数据加载
      if (noWhere && Object.keys(where).length === 0) {
        if (noWhere === true) {
          this.tip.hide();
        } else {
          // noWhere 可以是一个 Output，作为提示用
          this.tip.text = Output.createAny(noWhere);
        }
      } else {
        // 加载数据
        return Promise.all([ this.loadData(), this.loadCount() ]).then(([ list, count ]) => {
          if (!(list instanceof Array)) throw new Error('返回结果必须是数组');
          this.list = list;
          this.count = typeof count === 'number' ? count : count.count;
          // 如果设置了 pageSize，那么初始化分页控件
          if ('pageSize' in depot.scheme) this.pagination = new Pagination({ depot, list, count });
        });
      }
    });
  }

  init() {
    Object.defineProperty(this.depot, 'main', { configurable: true, value: this });
    this.promise = this.initData().catch(error => {
      this.error = error;
    });
  }

});
