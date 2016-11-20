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
    if (!(list instanceof Array)) return console.error('Resumt must be a list'); // eslint-disable-line
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
