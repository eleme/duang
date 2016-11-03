def((Output) => class extends Jinkela {
  init() {
    let { session, config } = depot;
    let value = session.username || session.user && session.user.name;
    if (!value) return;
    let { component, args } = config.session;
    if (!component) {
      component = 'HTML';
      args = { html: '{value}' };
    }
    let output = new Output({ component, args, value }).renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        flex: 1;
        text-align: right;
        width: 100px;
        padding-right: 1em;
        font-size: 13px;
      }
    `;
  }
});
