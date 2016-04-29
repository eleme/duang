def(() => class extends Jinkela {
  init() {
    Object.defineProperty(this.element, 'value', {
      get: () => { return this.value; },
      set: (value) => { this.value = value; }
    });
  }
});
