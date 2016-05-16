def(() => class extends Jinkela {
  init() {
    let { value, fixed } = this;
    if (fixed !== void 0) value = value.toFixed(fixed);
    this.element.textContent = value;
  }
});
