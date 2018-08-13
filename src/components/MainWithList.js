def((FatalError, Output, ListFlex, ListOperations, ListHeaders, ListFilters, Table, Pagination) => {

  return class extends Jinkela {
    get ListFlex() { return ListFlex; }
    get ListOperations() { return ListOperations; }
    get ListFilters() { return ListFilters; }
    get ListHeaders() { return ListHeaders; }
    get Table() { return Table; }
    get FatalError() { return FatalError; }
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
          <div class="tip" if="{tip}">{tip}</div>
          <jkl-fatal-error depot="{depot}" message="{message}" if="{message}"></jkl-fatal-error>
          <meta ref="pagination" />
        </div>
      `;
    }

    get styleSheet() {
      return `
        :scope {
          width: 100%;
          > .tip {
            text-align: center;
            font-size: 14px;
            padding: 2em;
          }
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
        let { depot } = this;
        let { scheme, where } = depot;
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
          return Promise.all([
            this.loadData(),
            this.loadCount()
          ]).then(([ list, count ]) => {
            if (!(list instanceof Array)) throw new Error('返回结果必须是数组');
            this.list = list;
            this.count = typeof count === 'number' ? count : count.count;
            // 如果设置了 pageSize，那么初始化分页控件
            if ('pageSize' in depot.scheme) this.pagination = new Pagination({ depot, list, count });
            return list.length;
          });
        }
      });
    }

    init() {
      Object.defineProperty(this.depot, 'main', { configurable: true, value: this });
      this.tip = '加载中 ···';
      this.promise = this.initData().then(length => {
        this.tip = length ? '' : '查不到匹配条件的数据';
        this.loading = false;
      }, error => {
        this.tip = '';
        if (typeof error === 'string') error = { message: '错误信息是一个字符串' };
        this.message = error.message || '未知错误';
      });
    }

  };

});
