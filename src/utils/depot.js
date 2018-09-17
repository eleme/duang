window.duang = () => {

  if (window.depot) return;

  require.config({
    paths: {
      marked: 'https://shadow.elemecdn.com/gh/chjj/marked@v0.3.6/marked.min',
      codemirror: 'https://shadow.elemecdn.com/gh/codemirror/CodeMirror@5.19.0',
      jsyaml: 'https://shadow.elemecdn.com/npm/js-yaml@3.12.0/dist/js-yaml.min'
    }
  });

  const parseObjectJSON = what => {
    try {
      what = JSON.parse(what);
    } catch (error) {
      void error;
    }
    return Object(what);
  };

  const CACHE_SYMBOL = Symbol('cache');

  class Depot {
    constructor(uParams) {
      this.resetCache();
      if (uParams) this.cache('uParams', () => uParams);
      Depot.initRootDepotOnce(this);
    }

    static initRootDepotOnce(depot) {
      // 只执行一次
      Object.defineProperty(this, 'initRootDepotOnce', { configurable: true, value: () => {} });
      // 全局事件注册
      if (document.readyState === 'complete') {
        setTimeout(() => depot.hashchange());
      } else {
        addEventListener('load', () => depot.hashchange());
      }
      addEventListener('hashchange', () => depot.hashchange());
      // 默认对话框样式不适合 Duang，魔改一波
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
      }).catch(error => {
        setTimeout(() => { throw error; });
        return new Promise(() => {});
      });
      Object.defineProperty(this, 'waitUntilReady', { configurable: true, value: () => promise });
      return promise;
    }

    static initConfig() {
      const configElement = document.querySelector('script[config]');
      const config = configElement && configElement.getAttribute('config') || '';
      let task = window.config ? Promise.resolve(window.config) : api(config);
      dispatchEvent(new CustomEvent('duang::notify', { detail: '正在加载根配置' }));
      task.then(value => {
        dispatchEvent(new CustomEvent('duang::notify', { detail: '根配置加载完毕' }));
        window.config = value; // 写到全局
      }, error => {
        dispatchEvent(new CustomEvent('duang::fatal', { detail: '根配置加载失败' }));
        throw error;
      });
      return task;
    }

    static initSchemes() {
      let { config } = this.prototype;
      let schemes = JSON.parse(JSON.stringify(config && config.schemes || []));
      let tasks = schemes.map(scheme => typeof scheme !== 'string' ? scheme : api(scheme));
      if (tasks.length === 0) return Promise.resolve([]);
      let total = 0;
      let loaded = 0;
      let update = result => {
        loaded++;
        dispatchEvent(new CustomEvent('duang::notify', { detail: `正在加载子配置 (${loaded}/${total})` }));
        return result;
      };
      total = tasks.filter(task => task instanceof Promise).map(task => task.then(update)).length;
      dispatchEvent(new CustomEvent('duang::notify', { detail: `正在加载子配置 (${loaded}/${total})` }));
      return Promise.all(tasks).then(list => {
        update = () => {};
        dispatchEvent(new CustomEvent('duang::notify', { detail: '子配置加载完毕' }));
        return [].concat(...list);
      }, error => {
        update = () => {};
        dispatchEvent(new CustomEvent('duang::fatal', { detail: '子配置加载失败' }));
        throw error;
      });
    }

    static initSession() {
      let { config } = this.prototype;
      let task = Promise.resolve({});
      if (config.session) {
        dispatchEvent(new CustomEvent('duang::notify', { detail: '正在加载用户信息' }));
        task = task.then(() => {
          let method = config.session.method || 'post';
          return api(config.session.authorize, { method });
        });
      }
      task.then(value => {
        dispatchEvent(new CustomEvent('duang::notify', { detail: '用户信息加载完毕' }));
        window.session = value;
      }, reason => {
        let response = reason && reason[Symbol.for('response')] || {};
        if (response.status === 401 || reason.name === 'UNAUTHORIZED') {
          location.href = api.resolvePath(new Function('return `' + config.session.signin + '`')());
        } else if (response.status !== 200) {
          dispatchEvent(new CustomEvent('duang::fatal', { detail: '用户信息加载失败' }));
          throw Error('用户信息加载失败');
        }
      });
      return task;
    }

    hashchange() {
      return Depot.waitUntilReady().then(() => {
        dispatchEvent(new CustomEvent('duang::notify', { detail: '正在加载并渲染框架控件' }));
        this.resetCache();
        return Promise.all([
          req('Frame'),
          this.loadModule(this.module)
        ]);
      }).then(([ Frame, Main ]) => {
        dispatchEvent(new CustomEvent('duang::done'));
        if (!this.moduleComponent) this.moduleComponent = new Frame().to(document.body);
        this.refresh(Main);
      }, error => {
        dispatchEvent(new CustomEvent('duang::fatal', { detail: '框架组件加载失败' }));
        setTimeout(() => { throw error; });
      });
    }

    // 缓存相关
    resetCache(value = {}) { Object.defineProperty(this, CACHE_SYMBOL, { configurable: true, value }); }
    cache(name, resolver) {
      let cache = this[CACHE_SYMBOL];
      if (name in cache) return cache[name];
      return (cache[name] = resolver());
    }

    /**
     * 属性缓存
    **/

    get module() { return this.uParams.get('module') || this.config.defaultModule || 'default'; }
    get id() { return this.params.id; }
    get key() { return this.uParams.get('key'); }
    get resolvedKey() { return String(this.key).replace(/:(?=\D)([^/]+)/g, ($0, $1) => this.params[$1]); }
    get scheme() { return this.schemeMap[this.key] || {}; }
    get where() { return this.cache('where', () => parseObjectJSON(this.uParams.get('where'))); }
    get params() { return this.cache('params', () => parseObjectJSON(this.uParams.get('params'))); }
    get page() { return this.cache('page', () => Math.max(+this.uParams.get('page'), 1)); }
    get uParams() {
      return this.cache('uParams', () => {
        let { search, hash } = location;
        // USP 在 get 的时候是取首次出现的，为了让 hash 的优先级更高，把 hash 拼在 search 前面了
        return new URLSearchParams(hash.replace(/^[#!]*/, '') + search.replace(/^[?]/, '&'));
      });
    }
    get formMode() {
      if (this.params.readonly) {
        return 'read';
      } else {
        return this.id ? 'edit' : 'create';
      }
    }
    get schemeMap() {
      let value = Object.create(null);
      this.schemes.forEach(scheme => {
        if (scheme.key !== void 0) value[scheme.key] = scheme;
      });
      Object.defineProperty(this, 'schemeMap', { value });
      return value;
    }
    get pageSize() {
      let pageSize = this.uParams.get('pageSize') || this.scheme.pageSize;
      return pageSize instanceof Array ? pageSize[0] : pageSize;
    }
    get queryParams() {
      let params = {};
      let page = this.page;
      let where = this.uParams.get('where') || '{}';
      let orderBy = this.uParams.get('orderBy');
      if (this.pageSize) {
        params.limit = this.pageSize;
        params.offset = this.pageSize * (page - 1 || 0);
      }
      params.where = where;
      if (orderBy) params.orderBy = orderBy;
      return new URLSearchParams(params);
    }
    getConst(name) {
      let { config, scheme } = this;
      return (scheme && scheme.const && scheme.const[name]) || (config.const && config.const[name]) || name;
    }

    /**
     * 各种方法
    **/

    refresh(Main = this.main.constructor) {
      let { scheme } = this;

      // 重新初始化构造器
      let newMain = new Main({ depot: this });

      // 如果设置了 gentleRefreshing，就考虑新实例的 promsie 异步
      let promise = scheme.gentleRefreshing && newMain.promise || Promise.resolve();

      return promise.then(() => {
        this.moduleComponent.main = newMain;
      });
    }

    loadModule(name) {
      // 对纯单词作为 MainWith 来加载，否则认为是一个 URL
      if (/^\w+$/.test(name)) {
        name = 'MainWith' + String(name).replace(/./, $0 => $0.toUpperCase()); // 首字母大写
      }
      return req(name).catch(() => req('MainWithError'));
    }

    go({ args, target, title }) {
      let uParams;
      if (args instanceof URLSearchParams) {
        uParams = args;
      } else {
        args = Object.assign({}, args);
        if (args.where && typeof args.where === 'object') args.where = JSON.stringify(args.where);
        if (args.params && typeof args.params === 'object') args.params = JSON.stringify(args.params);
        uParams = new URLSearchParams(args);
      }
      if (uParams.get('where') === '{}') uParams.delete('where');
      if (uParams.get('params') === '{}') uParams.delete('params');
      switch (target) {
        case '_blank':
          return open(location.href.replace(/(#.*)?$/, '#!' + uParams));
        case 'dialog':
          try {
            return this.loadModule(uParams.get('module')).then(Main => {
              let newDepot = new Depot(uParams);
              let main = new Main({ depot: newDepot, title });
              newDepot.moduleComponent = {
                get main() { return main; },
                set main(value) { main = value.renderWith(main); }
              };
              return Promise.resolve(main.$promise).then(() => {
                dialog.popup(main);
              });
            });
          } catch (error) {
            return console.error(error); // eslint-disable-line
          }
        case 'soft':
          history.pushState(null, null, location.href.replace(/(#.*)?$/, '#!' + uParams));
          this.resetCache();
          return;
        case 'replace':
          return location.replace(location.href.replace(/(#.*)?$/, '#!' + uParams));
        default:
          this.update(uParams, true);
      }
    }

    update(uParams, whole) {
      uParams = new URLSearchParams(uParams);
      if (!whole) {
        let usp = new URLSearchParams(this.uParams);
        uParams.forEach((value, key) => usp.set(key, value));
        uParams = usp;
      }
      if (uParams.get('where') === '{}') uParams.delete('where');
      if (uParams.get('params') === '{}') uParams.delete('params');
      if (this !== window.depot) {
        this.resetCache({ uParams });
        this.refresh();
      } else {
        let hash = '#!' + uParams;
        if (location.hash === hash) {
          this.refresh();
        } else {
          location.hash = hash;
        }
      }
    }

    fork(...args) { return new Depot(...args); }
  }

  window.depot = new Depot();

};
