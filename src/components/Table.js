def((TableRow, TableHead, TableCaption) => class extends Jinkela {
  get tagName() { return 'table'; }
  init() {
    let { scheme } = depot;
    if (scheme.caption) new TableCaption().renderTo(this);
    new TableHead().renderTo(this);
    if (!scheme.key) return alert('require key');
  }
  render(list) {
    let { scheme } = depot;
    list.forEach(fieldMap  => {
      new TableRow({ fieldMap }).renderTo(this);
    });
  }
  get styleSheet() {
    return `
      :scope {
        color: #666;
        font-size: 14px;
        line-height: 32px;
        margin: 1em;
        width: calc(100% - 2em);
        border-collapse: collapse;
      }
    `;
  }
});
