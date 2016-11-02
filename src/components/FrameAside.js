def(() => class extends Jinkela {
  init() {
    new this.parent.parent.Aside().renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        width: 200px;
        z-index: 1;
      }
    `;
  }
});
