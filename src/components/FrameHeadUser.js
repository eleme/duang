def((Output) => class extends Jinkela {
  init() {
    if (!session.username) return;
    let output = new Output(config.session, { value: session.username }).renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        float: right;
        padding-right: 1em;
        font-size: 12px;
      }
    `;
  }
});
