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
        float: right;
        padding-right: 1em;
        font-size: 12px;
      }
    `;
  }
});
