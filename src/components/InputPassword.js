def(() => class extends Jinkela {
  init() {
    if (this.width !== void 0) this.element.style.width = this.width;
  }
  get value() { return this.element.value; }
  set value(value) { this.element.value = value === void 0 ? '' : value; }
  get template() { return `<input type="password"/>`; }
  get styleSheet() {
    return `
      :scope {
        &:hover { border-color: #8492a6; }
        &:focus { border-color: #20a0ff; }
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
