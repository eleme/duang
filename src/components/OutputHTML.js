def(() => class extends Jinkela {
  get value() { return this.$value; }
  set value(value = this.defaultValue) {
    if (this.$value === value) return;
    this.$value = value;
    this.render();
  }
  init() {
    this.render();
    this.value = this.value;
  }
  render() {
    if ('html' in this) {
      this.element.innerHTML = String(this.html).replace(/\{(.*?)\}/g, ($0, key) => {
        let base = this.value instanceof Object ? this.value : this;
        return key.split('.').reduce((base, name) => Object(base)[name], base);
      }).replace(/<script>([\s\S]*?)<\/script>/g, ($0, code) => {
        return new Function(`return (${code})`)();
      });
    } else {
      this.element.innerHTML = this.value === void 0 ? '' : this.value;
    }
  }
  get styleSheet() {
    return `
      :scope {
        overflow: hidden;
      }
    `;
  }
});
