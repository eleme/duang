var depot = new class { // eslint-disable-line no-unused-vars

  constructor() {
    Object.defineProperty(this, 'moduleComponent', { writable: true, configurable: true });
    if (document.readyState === 'complete') {
      setTimeout(() => this.hashchange());
    } else {
      addEventListener('load', () => this.hashchange());
    }
    addEventListener('hashchange', () => this.hashchange());

    initDialog: {
      let { popup } = dialog;
      Object.defineProperty(dialog, 'popup', {
        configurable: true,
        value: (panel, options) => {
          dialog.box.element.style.maxHeight = '80%';
          dialog.box.element.style.overflow = 'auto';
          if (options && options.minWidth) {
            dialog.box.element.style.setProperty('min-width', options.minWidth);
          } else {
            dialog.box.element.style.removeProperty('min-width');
          }
          popup(panel);
        }
      });
    }
  }

  static waitUntilReady() {
    let promise = Promise.resolve(this.initConfig()).then(value => {
      Object.defineProperty(this.prototype, 'config', { configurable: true, value });
      return this.initSchemes();
    }).then(value => {
      Object.defineProperty(this.prototype, 'schemes', { configurable: true, value });
      return this.initSession();
    }).then(value => {
      Object.defineProperty(this.prototype, 'session', { configurable: true, value });
    });
    Object.defineProperty(this, 'waitUntilReady', { configurable: true, value: () => promise });
    return promise;
  }

  static initConfig() {
    const configElement = document.querySelector('script[config]');
    const config = configElement && configElement.getAttribute('config') || '';
    let task = window.config ? Promise.resolve(window.config) : api(config);
    this.setGlobalMessage('正在加载配置', true);
    task.then(value => {
      this.setGlobalMessage();
      window.config = value; // 写到全局
    }, error => {
      this.setGlobalMessage();
      throw error;
    });
    return task;
  }

  static initSchemes() {
    let { config } = this.prototype;
    let schemes = JSON.parse(JSON.stringify(config && config.schemes || []));
    return Promise.all(schemes.map(scheme => typeof scheme !== 'string' ? scheme : api(scheme))).then(list => {
      return [].concat(...list);
    });
  }

  static initSession() {
    let { config } = this.prototype;
    let task = config.session ? api(config.session.authorize, { method: config.session.method || 'post' }) : Promise.resolve({});
    this.setGlobalMessage('正在加载用户信息', true);
    task.then(value => {
      this.setGlobalMessage();
      window.session = value;
    }, reason => {
      this.setGlobalMessage();
      let response = reason && reason[Symbol.for('response')] || {};
      if (response.status === 401 || reason.name === 'UNAUTHORIZED') {
        location.href = api.resolvePath(new Function('return `' + config.session.signin + '`')());
      } else if (response.status !== 200) {
        throw Error('用户信息加载失败');
      }
    });
    return task;
  }

  static setGlobalMessage(message, animation) {
    if (message) {
      document.body.style.setProperty('--global-message', JSON.stringify(message));
      if (animation) {
        document.body.style.setProperty('--global-message-animation', 'body-busy');
      } else {
        document.body.style.removeProperty('--global-message-animation');
      }
    } else {
      document.body.style.removeProperty('--global-message');
      document.body.style.removeProperty('--global-message-animation');
    }
  }

  onRouteChange() {
    return this.constructor.waitUntilReady().then(() => {
      Object.defineProperty(this, Symbol.for('cache'), { configurable: true, value: {} });
      let moduleName = String(this.module || 'default');
      let tasks = Promise.all([ req('Frame'), req('MainWith' + moduleName.replace(/./, $0 => $0.toUpperCase())) ]);
      if (this._autoRefreshTimer) {
        clearTimeout(this._autoRefreshTimer);
        delete this._autoRefreshTimer;
      }
      return tasks;
    }, error => {
      alert(error.message);
      throw error;
    }).then(([ Frame, Main ]) => {
      if (!this.moduleComponent) this.moduleComponent = new Frame().to(document.body);
      this.moduleComponent.main = new Main({ depot: this });
      let { autoRefresh } = this.scheme || {};
      if (+autoRefresh) {
        this._autoRefreshTimer = setTimeout(() => {
          this.refresh();
          delete this._autoRefreshTimer;
        }, autoRefresh * 1000);
      }
    });
  }

  hashchange() { this.onRouteChange(); }

  cache(name, resolver) {
    let cache = this[Symbol.for('cache')];
    if (name in cache) return cache[name];
    return (cache[name] = resolver());
  }

  parseJSON(json) { try { return JSON.parse(json); } catch (error) { /* pass */ } }

  getConst(name) {
    let { config, scheme } = this;
    return (scheme && scheme.const && scheme.const[name]) || (config.const && config.const[name]) || name;
  }

  getSchemeByKey(key) { return this.schemeMap[key] || {}; }

  get module() { return this.uParams.module; }

  get formMode() {
    if (this.params.readonly) {
      return 'read';
    } else {
      return this.id ? 'edit' : 'create';
    }
  }

  get id() { return this.params.id; }

  get key() { return this.uParams.key; }

  get resolvedKey() { return String(this.key).replace(/:(?=\D)([^/]+)/g, ($0, $1) => this.params[$1]); }

  get scheme() { return this.getSchemeByKey(this.key); }

  get where() { return this.cache('where', () => this.parseJSON(this.uParams.where) || {}); }

  get params() { return this.cache('params', () => this.parseJSON(this.uParams.params) || {}); }

  get uParams() { return this.cache('uParams', () => new UParams()); }

  get schemeMap() {
    let value = Object.create(null);
    this.schemes.forEach(scheme => {
      if (scheme.key !== void 0) value[scheme.key] = scheme;
    });
    Object.defineProperty(this, 'schemeMap', { value });
    return value;
  }

  get pageSize() {
    let pageSize = this.uParams.pageSize || this.scheme.pageSize;
    return pageSize instanceof Array ? pageSize[0] : pageSize;
  }

  get queryParams() {
    let params = {};
    let { page, where, orderBy } = this.uParams;
    if (this.pageSize) {
      params.limit = this.pageSize;
      params.offset = this.pageSize * (page - 1 || 0);
    }
    if (where) params.where = where;
    if (orderBy) params.orderBy = orderBy;
    return new UParams(params);
  }

  refresh() {
    if (window.depot === this) return dispatchEvent(new Event('hashchange'));
    let { main } = this;
    new main.constructor({ depot: this }).renderWith(main);
  }

  go({ args, target, title }) {
    args = Object.assign({}, args);
    if (args.where && typeof args.where === 'object') args.where = JSON.stringify(args.where);
    if (args.params && typeof args.params === 'object') args.params = JSON.stringify(args.params);
    let uParams = new UParams(args);
    switch (target) {
      case '_blank':
        return open(location.href.replace(/(#.*)?$/, '#!' + uParams));
      case 'dialog':
        try {
          let name = String(args.module || 'default').replace(/./, $0 => $0.toUpperCase());
          return req(`MainWith${name}`).then(Main => {
            let main = new Main({ depot: this.fork(uParams), title });
            return Promise.resolve(main.$promise).then(() => dialog.popup(main));
          });
        } catch (error) {
          return console.error(error); // eslint-disable-line
        }
      case 'replace':
        return location.replace(location.href.replace(/(#.*)?$/, '#!' + uParams));
      default:
        let hash = '#!' + uParams;
        if (location.hash === hash) {
          depot.refresh();
        } else {
          location.hash = hash;
        }
        return;
    }
  }

  fork(uParams) {
    return Object.create(Object.getPrototypeOf(this), {
      uParams: { configurable: true, value: uParams },
      [Symbol.for('cache')]: { configurable: true, value: {} }
    });
  }

}();
