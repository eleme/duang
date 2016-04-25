def(() => class extends Jinkela {
  init() {
    new this.parent.parent.Main().renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        flex: 1;
        overflow: auto;
        background: #f7f7f7;
      }
    `;
  }
});
