def((XPut) => class extends XPut {
  buildComponent() {
    let { component = 'String', args = {} } = this;
    req('Input' + component).catch(() => {
      throw new Error(`Unknown component "${component}"`);
    }).then(Component => {
      this.input = new Component(args).renderTo(this);
      this.$promise.resolve();
    }, error => {
      this.element.textContent = error.message;
    });
  }
});
