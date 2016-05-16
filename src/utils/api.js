const api = new class extends Function {
  constructor() {
    super('...args', 'return this(...args)');
    return this.bind(this.launch);
  }
  resolvePath(base, path) {
    return [].concat(path).reduce((base, item) => {
      if (/^\/\//.test(item)) return item;
      if (/^\//.test(item)) return base.replace(/^((?:https?:)?\/\/[^/]*)?(.*)/, `$1${item}`);
      if (base[base.length - 1] !== '/') base += '/';
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
    const meta = document.querySelector('meta[name=api]');
    const base = meta ? meta.getAttribute('content') : '';
    return (path, options) => {
      return fetch(this.resolvePath(base, path), this.extendOptions(options)).then(response => {
        let type = /\bjson\b/.test(response.headers.get('content-type')) ? 'json' : 'text';
        if (response.status < 400) {
          return response[type]();
        } else {
          return response[type]().then(result => { throw result; });
        }
      });
    };
  }
};
