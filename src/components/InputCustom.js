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
    this.element.innerHTML = this.html;
  }
});
