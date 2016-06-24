def((XPut) => class extends XPut {
  buildComponent() {
    let { component, args = {}, params, query } = this;
    req('Output' + component).catch(() => {
      throw new Error(`Unknown component "${component}"`);
    }).then(Component => {
      this.input = new Component(args, { value: this.value }).renderTo(this);
      this.$promise.resolve();
    }, error => {
      this.element.textContent = error.message;
    });
  }
});
