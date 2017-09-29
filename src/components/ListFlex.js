def(() => class extends Jinkela {
  get template() {
    return '<div><meta ref="children"></div>';
  }
  get styleSheet() {
    return `
      :scope {
        margin: 1em 1em -1em 1em;
        display: flex;
      }
    `;
  }
});
