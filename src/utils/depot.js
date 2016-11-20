var depot = new class {
  constructor() {
    addEventListener('load', () => this.hashchange());
    addEventListener('hashchange', () => this.hashchange());
  }
  onRouteChange() {
    let moduleName = String(this.module || 'default');
    let tasks = Promise.all([ req('Frame'), req('MainWith' + moduleName.replace(/./, $0 => $0.toUpperCase())) ]);
    tasks.then(([ Frame, Main ]) => {
      if (!this.moduleComponent) this.moduleComponent = new Frame().to(document.body);
      this.moduleComponent.main = new Main();
    }, error => {
      console.log(error); // eslint-disable-line
    });
  }
  hashchange() {
    if (this.config.then) return this.config.then(() => this.hashchange()); // Await until config loaded
    if (this.session.then) return this.session.then(() => this.hashchange()); // Await until session loaded
    Object.defineProperty(this, '@@cache', { configurable: true, value: {} });
    this.onRouteChange();
  }
  cache(name, resolver) {
    let cache = this['@@cache'];
    if (name in cache) return cache[name];
    return cache[name] = resolver();
  }
  parseJSON(json) { try { return JSON.parse(json); } catch (error) { /* pass */ } }
  getConst(name) {
    let { config, scheme } = this;
    return (scheme && scheme.const && scheme.const[name]) || (config.const && config.const[name]) || name;
  }
  getSchemeByKey(key) { return this.schemeMap[key]; }
  get config() {
    const configElement = document.querySelector('script[config]');
    const config = configElement && configElement.getAttribute('config') || '';
    return window.config ? window.config : api(config).then(result => window.config = result);
  }
  get session() {
    if (!config.session) return window.session = {};
    return api(config.session.authorize, { method: config.session.method || 'post' }).then(
      value => Object.defineProperty(this, 'session', { configurable: true, value }),
      reason => {
        Object.defineProperty(this, 'session', { configurable: true, value: {} });
        if (reason.name === 'UNAUTHORIZED') {
          location.href = api.resolvePath(new Function('return `' + config.session.signin + '`')());
        }
      }
    );
  }
  get module() { return this.uParams.module; }
  get id() { return this.params.id; }
  get key() { return this.uParams.key; }
  get resolvedKey() { return String(this.key).replace(/:([^/]+)/g, ($0, $1) => this.params[$1]); }
  get scheme() { return this.getSchemeByKey(this.key); }
  get where() { return this.cache('where', () => this.parseJSON(this.uParams.where) || {}); }
  get params() { return this.cache('params', () => this.parseJSON(this.uParams.params) || {}); }
  get uParams() { return this.cache('uParams', () => new UParams()); }
  get schemeMap() {
    let value = Object.create(null);
    this.config.schemes.forEach(scheme => value[scheme.key] = scheme);
    Object.defineProperty(this, 'schemeMap', { value });
    return value;
  }
  get queryParams() {
    let params = {};
    let { page, where } = this.uParams;
    if (this.scheme.pageSize) {
      params.limit = this.scheme.pageSize;
      params.offset = this.scheme.pageSize * (page - 1 || 0);
    }
    if (where) params.where = where;
    return new UParams(params);
  }
  refresh() { this.onRouteChange(); }
  fork(uParams) {
    return Object.create(Object.getPrototypeOf(this), {
      uParams: { configurable: true, value: uParams },
      '@@cache': { configurable: true, value: {} }
    });
  }
};
