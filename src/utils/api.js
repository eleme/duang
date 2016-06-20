const api = new class extends Function {
  constructor() {
    super('...args', 'return this(...args)');
    return this.bind(this.launch);
  }
  resolvePath(path) {
    return this.basePath.concat(path).reduce((base, item) => {
      if (item === void 0) return base;
      if (/^(?:https?:)?\/\//.test(item)) return item;
      if (/^\//.test(item)) return base.replace(/^((?:https?:)?\/\/[^/]*)?(.*)/, `$1${item}`);
      if (item && base[base.length - 1] !== '/') base += '/';
      return base + item;
    });
  };
  extendOptions(options) {
    options = Object.assign({ credentials: 'include' }, options);
    if (options.body) {
      if (!options.headers) options.headers = {};
      options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    }
    return options;
  }
  get basePath() {
    let value = [ location.origin + location.pathname.replace(/[^/]*$/, 'api') ];
    const element = document.querySelector('[config]');
    if (element) value.push(element.getAttribute('config'));
    Object.defineProperty(this, 'basePath', { value });
    return value;
  }
  get launch() {
    return (path, options) => {
      return fetch(this.resolvePath(path), this.extendOptions(options)).then(response => {
        let type = response.headers.get('content-type');
        let key;
        switch (true) {
          case /\bjson\b/.test(type):
            key = 'json';
            break;
          case /\btext\b/.test(type):
          default:
            key = 'text';
        }
        if (response.status < 400) {
          return response[key]();
        } else {
          return response[key]().then(result => { throw result; });
        }
      });
    };
  }
};
