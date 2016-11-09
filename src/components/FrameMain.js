def(() => class extends Jinkela {
  init() {
    new this.parent.parent.Main().to(this);
  }
  get styleSheet() {
    return `
      :scope {
        flex: 1;
        overflow: auto;
        padding-bottom: 32px;
      }
    `;
  }
});
