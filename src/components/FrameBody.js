def((FrameMain) => class extends Jinkela {
  init() {
    let { Main } = this;
    this.$promise = new FrameMain({ Main }).to(this).$promise;
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
