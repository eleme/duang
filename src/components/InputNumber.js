def(() => class extends Jinkela {
  init() {
    this.element.addEventListener('blur', event => this.blur(event));
    if (this.min !== void 0) this.element.min = this.min;
    if (this.max !== void 0) this.element.max = this.max;
    if (this.step !== void 0) this.element.step = this.step;
    if (this.width !== void 0) this.element.style.width = this.width;
    if (this.readonly) this.element.setAttribute('readonly', 'readonly');
    if (!('defaultValue' in this)) this.defaultValue = this.min;
    this.value = this.default; // default 已废弃，暂时保持兼容，请使用 defaultValue
  }
  get value() { return +this.element.value; }
  set value(value) {
    if (+value !== +value) value = this.defaultValue;
    if (+value !== +value) value = 0;
    value *= 1;
    if (typeof this.decimal === 'number') value = +value.toFixed(this.decimal);
    this.element.value = value;
  }
  get template() { return '<input type="number" />'; }
  blur() {
    if (this.min !== void 0 && this.value < this.min) this.value = this.min;
    if (this.max !== void 0 && this.value > this.max) this.value = this.max;
    this.value = this.value;
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
        width: 120px;
        height: 28px;
        font-size: 12px;
        line-height: 28px;
      }
    `;
  }
});
