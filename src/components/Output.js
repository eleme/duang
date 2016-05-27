def((Item) => class extends Item {
  get template() { return `<span></span>`; }
  init() {

    let { component, args, scheme, params, query } = this;
    if (!component) {
      component = 'HTML';
      args = { html: '{value}' };
    }

    let $args;
    let url = scheme ? scheme.key + '/' + args : args;
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
      this.input = new Component(args, { value: this.value }).renderTo(this);
      this.$promise.resolve();
    }, error => {
      this.element.textContent = error.message;
    });

    this.$promise.then(() => {
      if (typeof this.onReady === 'function') this.onReady();
    });

  }
  get $promise() {
    let resolve;
    let value = new Promise($resolve => resolve = $resolve);
    value.resolve = resolve;
    Object.defineProperty(this, '$promise', { value });
    return value;
  }
  get value() { return this.$value; }
  set value(value) {
    this.$value = value;
    this.$promise.then(() => {
      this.input.value = value;
    });
  }
});
