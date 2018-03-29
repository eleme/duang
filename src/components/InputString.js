def(() => class extends Jinkela {
  get value() {
    let { value } = this.element;
    if (this.autoTrim) value = value.trim();
    if (this.minlength && value.length < this.minlength) throw new Error(`必须大于 ${this.minLength} 个字符`);
    if (this.minLength && value.length < this.minLength) throw new Error(`必须大于 ${this.minLength} 个字符`);
    if (this.notEmpty && !value) throw new Error('不能为空');
    return value;
  }
  set value(value = this.defaultValue) {
    this.$hasValue = true;
    this.element.value = value === void 0 ? '' : value;
  }
  init() {
    if (this.width !== void 0) this.element.style.width = this.width;
    if (this.readonly) this.element.setAttribute('readonly', 'readonly');
    if (typeof this.placeholder === 'string') this.element.setAttribute('placeholder', this.placeholder);
    if ('maxlength' in this) this.element.setAttribute('maxlength', this.maxlength);
    if ('maxLength' in this) this.element.setAttribute('maxlength', this.maxLength);
    if (!this.$hasValue) this.value = this.default; // default 已废弃，暂时保持兼容，请使用 defaultValue
  }
  get template() { return '<input type="text" />'; }
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
        box-sizing: border-box;
        width: 300px;
        height: 28px;
        font-size: 12px;
        line-height: 28px;
        border: 1px solid #C0CCDA;
        border-radius: 5px;
        padding: .4em .5em;
      }
    `;
  }
});
