def((FrameHeadLogo, Output) => class extends Jinkela {
  init() {
    let { logo = 'Duang' } = config;
    if (typeof logo === 'string') logo = { component: 'HTML', args: { html: logo } };
    new Output(logo).renderTo(this);;
  }
  get styleSheet() {
    return `
      :scope {
        width: 200px;
        padding-left: 1em;
      }
    `;
  }
});
