def((TableRow, TableHead, TableCaption) => class extends Jinkela {
  get tagName() { return 'table'; }
  get caption() {
    let { depot = window.depot } = this;
    let { scheme } = depot;
    let { caption, captionType = 'table' } = scheme;
    let value;
    if (captionType === 'table' && scheme.caption) {
      value = new TableCaption({ depot }).to(this);
    }
    Object.defineProperty(this, 'caption', { value, configurable: true });
    return value;
  }
  get head() {
    let { depot = window.depot } = this;
    let value = new TableHead({ depot }).to(this);
    Object.defineProperty(this, 'head', { value, configurable: true });
    return value;
  }
  set data(list) {
    if (!list) return;
    let { depot = window.depot } = this;
    let { scheme } = depot;
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
      void this.caption;
      void this.head;
      rows.forEach(row => row.to(this));
    });
  }
  get styleSheet() {
    return `
      :scope {
        color: #666;
        border: 1px solid #e0e6ed;
        font-size: 14px;
        line-height: 40px;
        margin: 1em;
        background: #fff;
        width: calc(100% - 2em);
        border-collapse: collapse;
      }
    `;
  }
});
