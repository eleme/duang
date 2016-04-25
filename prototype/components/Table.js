def((TableRow, TableHead) => class extends Jinkela {
  get template() { return `<table></table>`; }
  init() {
    let { scheme } = this;
    new TableHead({ scheme }).renderTo(this);
    if (!scheme.api) return alert('require api');
  }
  render(list) {
    let { scheme } = this;
    TableRow.cast(list, { scheme }).renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        color: #666;
        line-height: 32px;
        margin: 1em;
        width: calc(100% - 2em);
        border-collapse: collapse;
      }
    `;
  }
});
