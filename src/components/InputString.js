def(() => class extends Jinkela {
  get value() { return this.element.value; }
  set value(value) { this.element.value = value; }
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
