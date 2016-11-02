def((TableRow, TableHead, TableCaption) => class extends Jinkela {
  get tagName() { return 'table'; }
  init() {
    let { scheme } = depot;
    let { caption, captionType = 'table', key } = scheme;
    if (captionType === 'table' && scheme.caption) new TableCaption().renderTo(this);
    new TableHead().renderTo(this);
    if (!scheme.key) return alert('require key');
  }
  render(list) {
    let { scheme } = depot;
    if (!(list instanceof Array)) {
      return console.error('Resumt must be a list');
    }
    list.forEach(fieldMap  => {
      new TableRow({ fieldMap }).renderTo(this);
    });
  }
  get styleSheet() {
    return `
      :scope {
        color: #666;
        border: 1px solid #EFF2F7;
        font-size: 13px;
        line-height: 40px;
        margin: 1em;
        width: calc(100% - 2em);
        border-collapse: collapse;
      }
    `;
  }
});
