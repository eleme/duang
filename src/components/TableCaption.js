def((Output) => class extends Jinkela {
  get tagName() { return 'caption'; }
  init() {
    Output.cast(this.scheme.caption).renderTo(this);
  }
  get styleSheet() {
    return `
      :scope {
        color: red;
      }
    `;
  }
});
