{
  window.MOCK_DATA = {
    logo: {
      component: 'Html',
      args: { html: 'Duang demo' }
    },
    session: {
      authorize: 'token_validation',
      signin: '${location.origin.replace(/sakura|tsubaki/, \'sso\') + \'/sso/login?from=\' + encodeURIComponent(location.href)}',
      method: 'post'
    },
    schemes: []
  };
  let dependencies = [
    '/apis/basic.js',
    '/apis/scheme.js',
    '/apis/schemes.js'
  ];
  addEventListener('click', ({target}) => {
    if (target.getAttribute('data-action') !== 'download') return;
    if (target.href.toLowerCase() !== 'javascript:;') return;
    target.setAttribute('href', `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(MOCK_DATA))}`);
  });
  addEventListener('load', () => window._duang = new class {
    constructor() {
      this.id = 0;
      dependencies.forEach(script => {
        let $tag = document.createElement('script');
        $tag.src = script;
        document.head.appendChild($tag);
      });
    }
    get id() {
      return ++this._id;
    }
    set id(value) {
      this._id = value;
    }
    get headers() {
      return { 'content-type': 'application/json' };
    }
    get _schemes() {
      return ['operations', 'inputs', 'fields', 'filters', 'actions'];
    }
    get(scheme, url) {
      if (scheme === 'config') return { config: jsyaml.safeDump(MOCK_DATA) };
      let pattern = new RegExp(`/${scheme}/(.*)`);
      let id = url.match(pattern) && RegExp.$1;
      if (Array.isArray(MOCK_DATA[scheme]) && id) {
        return this.refactor(MOCK_DATA[scheme].find(item => +item.id === +id));
      } else {
        return this.refactor(MOCK_DATA[scheme]);
      }
    }
    put(scheme, url, data) {
      if (scheme === 'config') {
        return jsyaml.safeLoad(MOCK_DATA = data.upload ?
          data.upload : data.config);
      }
      let pattern = new RegExp(`/${scheme}/(\\w+)`);
      let id = url.match(pattern) && RegExp.$1;
      if (Array.isArray(MOCK_DATA[scheme])) {
        return MOCK_DATA[scheme].find((item, index) => {
          if (+item.id === +id) return Object.assign(MOCK_DATA[scheme][index], data);
        });
      } else {
        return MOCK_DATA[scheme] = data;
      }
    }
    post(scheme, url, data) {
      if (scheme === 'schemes') {
        this._schemes.forEach(_scheme => {
          Object.assign(data, {
            [_scheme]: {
              title: '查看',
              key: data.key,
              data: []
            }
          });
        });
      }
      return MOCK_DATA[scheme].push(Object.assign({ id: this.id }, data));
    }
    delete(scheme, url) {
      let pattern = new RegExp(`/${scheme}/(.*)`);
      let id = url.match(pattern)[1];
      if (!id) throw new Error('参数 id 不能为空');
      return MOCK_DATA[scheme].find((item, index) => {
        if (+item.id === +id) return MOCK_DATA[scheme].splice(index, 1);
      });
    }
    refactor(data) {
      if (typeof data.args === 'object') {
        data.args = jsyaml.safeDump(data.args);
      }
      return data;
    }
  });
}
