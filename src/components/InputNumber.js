def(() => class extends Jinkela {
  init() {
    this.element.addEventListener('blur', event => this.blur(event));
    this.value = this.default || this.min;
    if (this.min !== void 0) this.element.min = this.min;
    if (this.max !== void 0) this.element.max = this.max;
    if (this.width !== void 0) this.element.style.width = this.width;
  }
  get value() { return +this.element.value; }
  set value(value) { this.element.value = value; }
  get template() { return `<input type="number" />`; }
  blur(event) {
    if (this.min !== void 0 && this.value < this.min) this.value = this.min;
    if (this.max !== void 0 && this.value > this.max) this.value = this.max;
  }
  get styleSheet() {
    return `
      :scope {
        width: 6em;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: .5em;
      }
    `;
  }
});
