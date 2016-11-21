def((ListControlAside, ListControlMain) => class extends Jinkela {
  init() {
    let { depot } = this;
    new ListControlMain({ depot }).to(this);
    new ListControlAside({ depot }).to(this);
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
