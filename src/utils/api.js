{

  let cache = {};

  const parseResponseBody = response => {
    let mime = response.headers.get('Content-Type');
    switch (true) {
      case /\bjson\b/.test(mime) || /\.json([?#]|$)/.test(response.url):
        return response.text().then(result => result && JSON.parse(result));
      case /\byaml\b/.test(mime) || /\.ya?ml([?#]|$)/.test(response.url):
        return Promise.all([ response.text(), req('./jsyaml') ]).then(([ text, yml ]) => yml.load(text));
      case /\btext\b/.test(mime):
        return response.text();
      default:
        return response.blob();
    }
  };

  window.api = new class extends Function {
    constructor() {
      super('...args', 'return this(...args)');
      return this.bind(this.launch);
    }
    resolvePath(path) {
      let result = this.basePath.concat(path).reduce((base, item) => {
        if (item === void 0) return base;
        item = new Function('return `' + item + '`')();
        // 外链直接使用，不做额外处理
        if (/^(?:blob:)?(?:https?:)?\/\//.test(item)) return item;
        // 斜杆开头的接到 base 所在域名后面作为路径
        if (/^\//.test(item)) return base.replace(/^((?:https?:)?\/\/[^/]*)?(.*)/, `$1${item}`);
        // 其它情况，处理掉 qs，然后计算出相对路径
        if (item) {
          base = base.replace(/\?.*/, '');
          if (base[base.length - 1] !== '/') base += '/';
        }
        return base + item;
      });
      // 处理 QS 叠加
      let isFirst = true;
      result = result.replace(/\?/g, () => {
        if (!isFirst) return '&';
        isFirst = false;
        return '?';
      });
      return result;
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
          url += ~url.indexOf('?') ? '&' : '?';
          url += Object.keys(options.query).map(key => {
            return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(options.query[key]))}`;
          }).join('&');
        }
        const resolver = () => fetch(url, this.extendOptions(options)).then(response => {
          return parseResponseBody(response).then(result => {
            if (result && typeof result === 'object') result[Symbol.for('response')] = response;
            if (response.status < 400) {
              return result;
            } else {
              throw result;
            }
          });
        }).catch(error => {
          if (error instanceof SyntaxError) error.message += ` in ${url}`;
          if (error.message === 'Failed to fetch') error.message = '网络不给力，请稍后重试';
          throw error;
        });
        return this.cache(path, options, resolver);
      };
    }
  }();

}
