def((Output) => class extends Jinkela {
  init() {
    let { session = {}, config } = this.depot || window.depot;
    let value = session.username || session.user && session.user.name || session.name;
    if (!value) return;
    let { component, args } = config.session;
    if (!component) {
      component = 'HTML';
      args = { html: '{value}' };
    }
    void new Output({ component, args, value }).to(this);
  }
  get styleSheet() {
    return `
      :scope {
        text-align: right;
        font-size: 14px;
      }
    `;
  }
});
