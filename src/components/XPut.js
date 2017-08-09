def((Item) => {

  const parse = (base, depot = window.depot, query) => Promise.all(Object.keys(base).map(async key => {
    let item = base[key];
    if (key[0] === '@') {
      delete base[key];
      let options = { expires: 1000 };
      if (query) options.query = { where: depot.where };
      try {
        let path = [];
        if (depot.scheme) path.push(depot.resolvedKey);
        base[key.slice(1)] = await api(path.concat(item), options);
      } catch (error) {
        console.error(error);
        throw new Error(`组件参数（${key}: ${item}）拉取失败`);
      }
    } else {
      if (item && typeof item === 'object') await parse(item, depot, query);
    }
  }));

  return class extends Item {

    beforeParse(params) {
      Object.defineProperty(this, '$value', { configurable: true, writable: true });
      Object.defineProperty(this, '$hasValue', { configurable: true, writable: true, value: false });
      Object.defineProperty(this, '$resolveAt', { configurable: true, writable: true, value: false });
      let { depot, query } = params;
      this.$resolveAt = parse(params, depot, query).then(() => Object.assign(this, refactor(params, params)));
    }

    get tagName() { return 'span'; }

    get componentName() {
      let componentName = this.component || this.defaultComponent;
      if (/^(?:https?:)\/\//.test(componentName)) {
        return componentName;
      } else {
        let [ , hint = this.hint, name ] = String(componentName).match(/^(Input|Output)?(.*)$/);
        return hint + name;
      }
    }

    set depot(ignore) {}
    get depot() { return this.parent.depot || window.depot; }

    async didMount() {
      try {
        await this.$resolveAt;
        await this.buildComponent();
      } catch (error) {
        this.element.textContent = error.message;
      } finally {
        this.$promise.resolve();
      }
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

