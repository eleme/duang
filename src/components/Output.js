def((XPut) => {

  let outputCache = {};

  return class extends XPut {
    buildComponent() {
      let { component, args = {}, params, query, depot, value } = this;
      // Try to load output compunent from cache, avoid the async loading process
      if (component in outputCache) {
        let Component = outputCache[component];
        this.result = new Component(args, { value, depot }).to(this);
        this.$promise.resolve();
      } else {
        return req('Output' + component).catch(() => {
          throw new Error(`Unknown component "${component}"`);
        }).then(Component => {
          outputCache[component] = Component;
          this.result = new Component(args, { value, depot }).to(this);
          this.$promise.resolve();
        }, error => {
          this.element.textContent = error.message;
        });
      }
    }
  };

});
