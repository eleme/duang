def((Item) => class extends Item {
  get template() { return `<span></span>`; }
  init() {

    let resolve;
    this.$promise = new Promise($resolve => resolve = $resolve);
    let { component = 'String', args, scheme, params, query } = this;
    let $args;
    let url = scheme.key + '/' + args;
    if (query) url = url + '?' + new UParams(params);
    if (typeof args === 'string') {
      $args = args[0] === '/' ? api(args) : api(url);
    } else {
      $args = Promise.resolve(args);
    }
    $args = $args.catch(error => {
      throw new Error(`Component "${component}" args "${args}" loading error with "${error.message}"`);
    });

    let $Component = req('Output' + component).catch(() => {
      throw new Error(`Unknown component "${component}"`);
    });

    Promise.all([ $Component, $args ]).then(([ Component, args ]) => {
      this.input = new Component(args).renderTo(this);
      resolve();
    }, error => {
      this.element.textContent = error.message;
    });

    this.$promise.then(() => {
      if (typeof this.onReady === 'function') this.onReady();
    });

  }
});
