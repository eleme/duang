def((InputFileToken) => {
  return class extends Jinkela {
    init(...args) {
      this.$cache = {};
      this.input = new InputFileToken(...args).to(this);
      this.element.addEventListener('change', () => this.change.bind(this));
    }
    change() { this.$cache = {}; }
    set value(value) {
      value = Object(value);
      this.input.value = value.token;
      this.$cache = value;
    }
    get value() {
      if (this.$cache.token) return this.$cache;
      let { width, height } = this.input.info;
      return {
        token: (width && height) ? this.input.value : null,
        width,
        height
      };
    }
  };
});

