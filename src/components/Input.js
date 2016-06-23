def((Item) => class extends Item {
  get tagName() { return `span`; }
  init() {

    let { component = 'String', args } = this;
    let { scheme } = depot;

    let path = [];
    if (scheme) path.push(scheme.key);

    let $args = function callee(args) {
      let tasks = [];
      for (let i in args) {
        let item = args[i];
        if (i[0] === '@') {
          let task = api(path.concat(item)).then(result => {
            args[i.slice(1)] = result;
          });
          tasks.push(task);
          delete args[i];
        } else {
          if (typeof item === 'object') {
            tasks.push(callee(item));
          }
        }
      }
      return Promise.all(tasks).then(() => args);
    }(args);

    $args = $args.catch(error => {
      throw new Error(`Component "${component}" args "${args}" loading error with "${error.message}"`);
    });

    let $Component = req('Input' + component).catch(() => {
      throw new Error(`Unknown component "${component}"`);
    });

    Promise.all([ $Component, $args ]).then(([ Component, args ]) => {
      this.input = new Component(args).renderTo(this);
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
  get value() { return this.input.value; }
  set value(value) {
    if (this.input) {
      this.input.value = value;
    } else {
      this.$promise.then(() => this.value = value);
    }
  }
});
