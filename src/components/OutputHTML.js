def(() => class extends Jinkela {
  get value() { return this.$value; }
  set value(value) {
    if (this.$value === value) return;
    this.$value = value;
    this.render();
  }
  init() {
    this.render();
    this.value = this.value;
  }
  render() {
    this.element.innerHTML = String(this.html).replace(/\{(.*?)\}/g, ($0, key) => {
      let base = typeof this.value === 'string' ? this : this.value;
      return key.split('.').reduce((base, name) => Object(base)[name], base);
    }).replace(/<script>([\s\S]*?)<\/script>/g, ($0, code) => {
      return new Function(`return (${code})`)();
    });
  }
});
