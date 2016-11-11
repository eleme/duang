def((Button) => class extends Button {
  init() {
    this.element.removeAttribute('style');
  }
  get styleSheet() {
    return `
      :scope {
        background-color: transparent;
        border-color: #c0ccda;
        color: #1f2d3d;
        &:not([disabled]):hover {
          color: #20a0ff;
          border-color: #20a0ff;
        }
      }
    `;
  }
});
