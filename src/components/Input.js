def((Item) => class extends Item {
  get template() { return `<span></span>`; }
  init() {
    let resolve;
    this.$promise = new Promise($resolve => resolve = $resolve);
    let { component = 'String' } = this;
    req('Input' + component).then(Component => {
      this.input = new Component(this.args).renderTo(this);
      resolve();
    }, error => {
      this.element.textContent = `Unknown component "${this.component}"`;
    });
    this.$promise.then(() => {
      if (typeof this.onReady === 'function') this.onReady();
    });
  }
  get value() { return this.input.value; }
  set value(value) {
    if (this.input) {
      this.input.value = value;
    } else {
      this.$promise.then(() => this.value = value);
    }
  }
});
