def(() => class extends Jinkela {
  init() {
    this.element.addEventListener('blur', event => this.blur(event));
    this.value = this.default || this.min;
    if (this.min !== void 0) this.element.min = this.min;
    if (this.max !== void 0) this.element.max = this.max;
    if (this.width !== void 0) this.element.style.width = this.width;
    if (this.readonly) this.element.setAttribute('readonly', 'readonly');
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
        &:hover { border-color: #8492a6; }
        &:focus { border-color: #20a0ff; }
        &[readonly] {
          background-color: #eff2f7;
          border-color: #d3dce6;
          color: #bbb;
          cursor: not-allowed;
        }
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 6em;
        box-sizing: border-box;
        border: 1px solid #C0CCDA;
        border-radius: 5px;
        padding: .4em .5em;
        min-width: 120px;
        height: 28px;
        font-size: 12px;
        line-height: 28px;
      }
    `;
  }
});
