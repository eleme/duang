def((TableRow, TableHead, TableCaption) => class extends Jinkela {
  get template() {
    return `
      <div>
        <table ref="table"></table>
      </div>
    `;
  }
  get caption() {
    let { depot = window.depot } = this;
    let { scheme } = depot;
    let { captionType = 'table' } = scheme;
    let value;
    if (captionType === 'table' && scheme.caption) {
      value = new TableCaption({ depot }).to(this.table);
    }
    Object.defineProperty(this, 'caption', { value, configurable: true });
    return value;
  }
  get head() {
    let { depot = window.depot } = this;
    let value = new TableHead({ depot }).to(this.table);
    Object.defineProperty(this, 'head', { value, configurable: true });
    return value;
  }
  set data(list) {
    if (!list) return;
    if (list === 'EMPTY_FIELDS') return this.touch();
    let { depot = window.depot } = this;
    let { orderBy } = depot.uParams;
    if (!(list instanceof Array)) return console.error(`返回结果必须是数组, ${ JSON.stringify(list) }`); // eslint-disable-line
    if (orderBy) {
      let isDesc = (orderBy[0] === '-');
      let key = isDesc ? orderBy.slice(1) : orderBy;
      list = list.sort((current, next) => {
        let value = current[key];
        let nextValue = next[key];
        if (value == null) return 1; // eslint-disable-line
        // sort => (value > nextValue) ? 1 : -1 是升序排序
        // 两个相同 boolean 进行 `^` 异或操作为 0, 否则为 1
        // 因此: 升序 ^ 降序(isDesc) = 0 && 升序 ^ 升序(!isDesc) = 1
        return (value > nextValue ^ isDesc) ? 1 : -1;
      });
    }
    let rows = list.map(fieldMap => new TableRow({ fieldMap, depot }));
    Promise.all(rows.map(row => row.$promise)).then(rows => {
      this.touch();
      rows.forEach(row => row.to(this.table));
    });
  }
  touch() {
    void this.caption;
    void this.head;
  }
  get styleSheet() {
    return `
      :scope {
        margin: 1em;
        width: calc(100% - 2em);
        overflow: auto;
        border: 1px solid #e0e6ed;
        box-sizing: border-box;
        > table {
          margin-bottom: -1px;
          color: #666;
          font-size: 14px;
          line-height: 40px;
          width: 100%;
          background: #fff;
          border-collapse: collapse;
        }
      }
    `;
  }
});
