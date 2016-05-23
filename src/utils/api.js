const api = new class extends Function {
  constructor() {
    super('...args', 'return this(...args)');
    return this.bind(this.launch);
  }
  resolvePath(base, path) {
    return [].concat(path).reduce((base, item) => {
      if (/^(?:https?:)?\/\//.test(item)) return item;
      if (/^\//.test(item)) return base.replace(/^((?:https?:)?\/\/[^/]*)?(.*)/, `$1${item}`);
      if (item && base[base.length - 1] !== '/') base += '/';
      return base + item;
    }, base);
  };
  extendOptions(options) {
    options = Object.assign({ credentials: 'include' }, options);
    if (options.body) {
      if (!options.headers) options.headers = {};
      options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    }
    return options;
  }
  get launch() {
    let base = location.origin + location.pathname.replace(/[^/]*$/, 'api');
    const element = document.querySelector('[config]');
    if (element) base = this.resolvePath(base, element.getAttribute('config'));
    return (path, options) => {
      return fetch(this.resolvePath(base, path), this.extendOptions(options)).then(response => {
        let type = response.headers.get('content-type');
        let key = /\bjson\b/.test(type) ? 'json' : 'text';
        if (response.status < 400) {
          return response[key]();
        } else {
          return response[key]().then(result => { throw result; });
        }
      });
    };
  }
};
