def(() => class extends Jinkela {
  get template() { return `<textarea></textarea>`; }
  get styleSheet() {
    return `
      :scope {
        width: 300px;
        height: 60px;
        border: 1px solid #ccc;        
        border-radius: 5px;
        padding: .5em;
      }
    `;
  }
});
