def((Item) => class extends Item {
  beforeParse() { Object.defineProperty(this, '$value', { configurable: true, writable: true }); }
  get tagName() { return 'span'; }
  set depot(ignore) {}
  get depot() { return this.parent.depot || window.depot; }
  didMount() {
    this.resolveAt().then(() => this.buildComponent());
  }
  resolveAt() {
    let { depot } = this;
    let path = [];
    if (depot.scheme) path.push(depot.resolvedKey);
    let { query } = this;
    return function callee(base) {
      let tasks = [];
      Object.keys(base).forEach(i => {
        let item = base[i];
        if (i[0] === '@') {
          let options = { expires: 1000 };
          if (query) options.query = { where: depot.where };
          let task = api(path.concat(item), options).then(result => {
            base[i.slice(1)] = result;
          });
          tasks.push(task);
        } else {
          if (item && typeof item === 'object') {
            tasks.push(callee(item));
          }
        }
      });
      return Promise.all(tasks).then(() => {});
    }(this).catch(error => {
      throw new Error(`组件参数读取失败：'${error.message || JSON.stringify(error)}'`);
    });
  }
  get $promise() {
    let resolve, reject;
    let value = new Promise((...args) => [ resolve, reject ] = args);
    value.then(() => {
      if ('$value' in this) {
        this.value = this.$value;
        delete this.$value;
      }
      if (typeof this.onReady === 'function') this.onReady();
    });
    value.resolve = resolve;
    Object.defineProperty(this, '$promise', { value });
    return value;
  }
  get value() { return '$value' in this ? this.$value : this.result && this.result.value; }
  set value(value) {
    if (!this.result) return this.$value = value;
    this.result.value = value;
  }
});
