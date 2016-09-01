def((ListControlAside, ListControlMain) => class extends Jinkela {
  init() {
    new ListControlMain().renderTo(this);
    new ListControlAside().renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        margin: 1em 1em -1em 1em;
        display: flex;
      }
    `;
  }
});
