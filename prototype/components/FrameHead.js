def(() => class extends Jinkela {
  init() {
    this.element.textContent = 'frame head';
  }
  get styleSheet() {
    return `
      :scope {
        background: #eee;
        height: 50px;
      }
    `;
  }
});
