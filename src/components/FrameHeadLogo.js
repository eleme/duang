def((FrameHeadLogo) => class extends Jinkela {
  get template() {
    return `<a href="#">Duang</a>`;
  }
  init() {
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
