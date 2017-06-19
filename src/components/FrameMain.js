def(() => class extends Jinkela {
  get styleSheet() {
    return `
      :scope {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        flex: 1;
        overflow: auto;
      }
    `;
  }
});
