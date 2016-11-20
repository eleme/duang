{

  let cache = {};

  window.api = new class extends Function {
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
    }
    extendOptions(options) {
      options = Object.assign({ credentials: 'include' }, options);
      if (options.body) {
        if (!options.headers) options.headers = {};
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
      }
      return options;
    }
    cache(path, options = {}, resolver) {
      let key = JSON.stringify([ path, options ]);
      let { expires } = options;
      if (key in cache) return cache[key];
      let $result = resolver();
      if (expires) {
        cache[key] = $result;
        setTimeout(() => delete cache[key], expires);
      }
      return $result;
    }
    get basePath() {
      let value = [ location.origin + location.pathname.replace(/[^/]*$/, 'api') ];
      let baseElement = document.querySelector('script[base]');
      let base = baseElement && baseElement.getAttribute('base');
      if (!base) {
        let configElement = document.querySelector('script[config]');
        let config = configElement && configElement.getAttribute('config') || '';
        base = config.replace(/[^/]*$/, '');
      }
      if (base) value.push(base);
      Object.defineProperty(this, 'basePath', { value });
      return value;
    }
    get launch() {
      return (path, options) => {
        let url = this.resolvePath(path);
        if (options && 'query' in options) {
          url += '?' + Object.keys(options.query).map(key => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(options.query[key]))}`;
          }).join('&');
        }
        const resolver = () => fetch(url, this.extendOptions(options)).then(response => {
          let type = response.headers.get('content-type');
          let key;
          switch (true) {
            case /\bjson\b/.test(type):
              key = 'json';
              break;
            case /\btext\b/.test(type):
              key = 'text';
              break;
            default:
              key = 'blob';
          }
          if (response.status < 400) {
            return response[key]();
          } else {
            return response[key]().then(result => { throw result; });
          }
        });
        return this.cache(path, options, resolver);
      };
    }
  };

}
