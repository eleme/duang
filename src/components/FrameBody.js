def((FrameMain, FrameAside) => class extends Jinkela {
  init() {
    new FrameAside().to(this);
    this.$promise = new FrameMain({ Main: this.Main }).to(this).$promise;
  }
  get styleSheet() {
    return `
      :scope {
        height: 100%;
        display: flex;
        flex: 1;
      }
    `;
  }
});
