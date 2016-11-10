def((XPut) => class extends XPut {
  buildComponent() {
    let { component, args = {}, params, query, depot, value } = this;
    return req('Output' + component).catch(() => {
      throw new Error(`Unknown component "${component}"`);
    }).then(Component => {
      this.result = new Component(args, { value, depot }).to(this);
      this.$promise.resolve();
    }, error => {
      this.element.textContent = error.message;
    });
  }
});
