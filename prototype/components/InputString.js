def(() => class extends Jinkela {
  get template() { return `<input/>`; }
  get styleSheet() {
    return `
      :scope {
        border: 1px solid #ccc;        
        border-radius: 5px;
        padding: .5em;
      }
    `;
  }
});
