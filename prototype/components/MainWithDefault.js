def((Table, TableTip, Pager) => class extends Jinkela {
  get template() {
    return `<h1>Duang!!!</h1>`;
  }
  get styleSheet() {
    return `
      :scope {
        margin: 1em;
        font-size: 64px;
      }
    `;
  }
});
