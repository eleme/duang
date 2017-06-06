def((XPut) => class extends XPut {
  buildComponent() {
    let { component, args = {}, params, query, depot, value } = this;
    void params;
    void query;
    let [ , hint = 'Output', name ] = String(component).match(/^(Input|Output)?(.*)$/);
    return req(hint + name).catch(() => {
      throw new Error(`Unknown component "${component}"`);
    }).then(Component => {
      this.result = new Component(args, { value, depot }).to(this);
      this.$promise.resolve();
    }, error => {
      this.element.textContent = error.message;
    });
  }
});
