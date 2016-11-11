def(() => class extends Jinkela {
  get value() { return this.element.value; }
  set value(value) { this.element.value = value === void 0 ? '' : value; }
  get tagName() { return `textarea`; }
  init() {
    this.value = this.default || '';
    if (this.width !== void 0) this.element.style.width = this.width;
    if (this.height !== void 0) this.element.style.height = this.height;
    if (this.readonly) this.element.setAttribute('readonly', 'readonly');
    if ('placeholder' in this) this.element.setAttribute('placeholder', this.placeholder);
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
        vertical-align: middle;
        width: 300px;
        height: 60px;
        border: 1px solid #C0CCDA;
        border-radius: 5px;
        padding: .5em;
        font-size: 12px;
        outline: none;
      }
    `;
  }
});
