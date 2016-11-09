def((FrameMain) => class extends Jinkela {
  init() {
    new FrameMain({ parent: this }).to(this);
  }
  get styleSheet() {
    return `
      :scope {
        display: flex;
        flex: 1;
      }
    `;
  }
});
