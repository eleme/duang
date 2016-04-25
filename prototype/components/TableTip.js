def(() => class extends Jinkela {
  init() {
    this.element.textContent = 'Loading ...';
  }
  render(result) {
    if (result.length) {
      this.element.style.display = 'none';
    } else {
      this.element.textContent = 'No Data';
    }
  }
  get styleSheet() {
    return `
      :scope {
        text-align: center;
        font-size: 24px;
        padding: 1em;
      }
    `;
  }
});
