def((Output) => class extends Jinkela {
  init() {
    let { logo = 'Duang' } = config;
    if (typeof logo === 'string') logo = { component: 'HTML', args: { html: logo } };
    new Output(logo).to(this);
    this.element.addEventListener('click', () => location.hash = '');
  }
  get styleSheet() {
    return `
      .folded :scope { width: 50px; }
      :scope {
        overflow: hidden;
        transition: width 200ms ease;
        height: 50px;
        width: 230px;
        line-height: 50px;
        text-align: center;
        background: #1d8ce0;
        color: #fff;
        font-weight: 500;
        cursor: pointer;
        &:hover {
          opacity: .95;
        }
      }
    `;
  }
});
