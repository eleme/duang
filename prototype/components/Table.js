def((TableRow, TableHead) => class extends Jinkela {
  get template() { return `<table></table>`; }
  init() {
    let { scheme } = this;
    new TableHead({ fields: scheme.fields }).renderTo(this);
    if (!scheme.api) return alert('require api');
  }
  render(list) {
    TableRow.cast(list).renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        margin: 1em;
        width: calc(100% - 2em);
        border-collapse: collapse;
      }
    `;
  }
});
