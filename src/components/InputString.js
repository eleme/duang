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
        &:focus { border-color: #20A0FF; }
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        vertical-align: middle;
        box-sizing: border-box;
        width: 300px;
        height: 28px;
        font-size: 14px;
        line-height: 28px;
        border: 1px solid #C0CCDA;
        border-radius: 5px;
        padding: .4em .5em;
      }
    `;
  }
});
