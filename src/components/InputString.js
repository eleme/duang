def(() => class extends Jinkela {
  init() {
    this.value = this.default || '';
    if (this.width !== void 0) this.element.style.width = this.width;
    if (this.readonly) this.element.setAttribute('readonly', 'readonly');
    if ('placeholder' in this) this.element.setAttribute('placeholder', this.placeholder);
  }
  get value() { return this.element.value; }
  set value(value) { this.element.value = value === void 0 ? '' : value; }
  get template() { return `<input/>`; }
  get styleSheet() {
    return `
      :scope {
        &[readonly] { background: #f7f7f7; }
        width: 300px;
        border: 1px solid #ccc;        
        border-radius: 5px;
        padding: .5em;
      }
    `;
  }
});
