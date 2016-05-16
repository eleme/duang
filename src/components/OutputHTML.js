def(() => class extends Jinkela {
  get value() { return this.$value; }
  set value(value) {
    if (this.$value === value) return;
    this.$value = value;
    this.element.innerHTML = this.html.replace(/\{(.*?)\}/g, ($0, key) => this[key]);
  }
  init() {
    this.value = this.value;
  }
});
