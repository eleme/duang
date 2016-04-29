def(() => class extends Jinkela {
  init() {
    new this.parent.parent.Aside().renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        width: 200px;
        background: #eee;
        border-right: 1px solid #ddd;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        z-index: 1;
      }
    `;
  }
});
