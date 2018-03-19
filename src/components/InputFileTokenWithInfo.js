def((InputFileToken) => {
  return class extends Jinkela {
    init(...args) {
      this.$cache = {};
      this.input = new InputFileToken(...args, { defaultValue: Object(this.defaultValue).token }).to(this);
      this.element.addEventListener('change', this.change.bind(this));
      if (!this.$hasValue) this.value = void 0;
    }
    change() { this.$cache = {}; }
    set value(value = this.defaultValue) {
      this.$hasValue = true;
      value = Object(value);
      this.input.value = value.token;
      this.$cache = value;
    }
    get value() {
      if (this.$cache.token) return this.$cache;
      let { width, height } = this.input.info || {};
      let token = this.input.value;
      return (width && height && token) ? { token, width, height } : null;
    }
  };
});
