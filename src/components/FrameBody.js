def((FrameAside, FrameMain) => class extends Jinkela {
  init() {
    new FrameAside({ parent: this }).renderTo(this);
    new FrameMain({ parent: this }).renderTo(this);
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
