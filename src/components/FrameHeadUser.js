def((Output) => class extends Jinkela {
  init() {
    let value = session.username || session.user && session.user.name;
    if (!value) return;
    let output = new Output(config.session, { value }).renderTo(this);
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
