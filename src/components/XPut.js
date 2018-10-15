def((Item) => {

  const swrApi = setStaleWhileRevalidate(api, 60);

  const parse = (base, depot = window.depot, query) => Promise.all(Object.keys(base).map(key => {
    let item = base[key];
    if (key[0] === '@') {
      delete base[key];
      let options = { expires: 1000 };
      if (query) options.query = { where: depot.where };
      let path = [];
      if (depot.scheme) path.push(depot.resolvedKey);
      path = path.concat(item);
      return swrApi(path, options).then(value => {
        if (value && typeof value === 'object') return parse(value, depot, query).then(() => value);
        return value;
      }, error => {
        console.error(error);
        throw new Error(`组件参数（${key}: ${item}）拉取失败`);
      }).then(value => {
        base[key.slice(1)] = value;
      });
    } else {
      if (item && typeof item === 'object') return parse(item, depot, query);
    }
  }));

  return class extends Item {

    beforeParse(params) {
      Object.defineProperty(this, '$value', { configurable: true, writable: true });
      Object.defineProperty(this, '$hasValue', { configurable: true, writable: true, value: false });
      Object.defineProperty(this, '$resolveAt', { configurable: true, writable: true, value: false });
      let { depot, query } = params;
      this.depot = depot;
      let tmpl = JSON.parse(JSON.stringify(Object.assign({}, params, { depot: void 0 })));
      this.$resolveAt = parse(tmpl, depot, query).then(() => {
        Object.assign(this, refactor(tmpl, params));
      });
    }

    get tagName() { return 'span'; }

    get componentName() {
      let componentName = this.component || this.defaultComponent;
      if (/\W/.test(componentName)) {
        return componentName;
      } else {
        let [ , hint = this.hint, name ] = String(componentName).match(/^(Input|Output)?(.*)$/);
        return hint + name;
      }
    }

    init() {
      return Promise.resolve(this.$resolveAt).then(() => this.buildComponent()).then(() => {
        this.$promise.resolve();
      }, error => {
        setTimeout(() => { throw error; });
        this.element.textContent = error.message;
        this.$promise.resolve();
      });
    }

    get $promise() {
      let resolve, reject;
      let value = new Promise((...args) => ([ resolve, reject ] = args));
      void reject;
      value.then(() => {
        if (this.$hasValue) {
          this.value = this.$value;
          delete this.$value;
          delete this.$hasValue;
        }
        if (typeof this.onReady === 'function') this.onReady();
      });
      value.resolve = resolve;
      value.reject = reject;
      Object.defineProperty(this, '$promise', { value });
      return value;
    }

    get value() { return this.$hasValue ? this.$value : this.result && this.result.value; }
    set value(value) {
      if (!this.result) {
        this.$hasValue = true;
        return (this.$value = value);
      }
      this.result.value = value;
    }

  };

});

