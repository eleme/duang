def((ListControlAside, ListControlMain) => class extends Jinkela {
  init() {
    new ListControlMain().to(this);
    new ListControlAside().to(this);
  }
  get styleSheet() {
    return `
      :scope {
        margin: 1em 1em -1em 1em;
        display: flex;
        align-items: flex-end;
      }
    `;
  }
});
