def((Output) => class extends Jinkela {
  init() {
    let welcome = config.welcome || { component: 'HTML', args: { html: '<h1>Duang!!!</h1>' } };
    new Output(welcome).renderTo(this);;
  }
  get template() {
    return ``;
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
