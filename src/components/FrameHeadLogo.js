def((FrameHeadLogo) => class extends Jinkela {
  get template() {
    return `<a href="JavaScript:">Duang</a>`;
  }
  init() {
    this.element.addEventListener('click', event => this.click(event));
  }
  click(event) {
    location.hash = '';
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
