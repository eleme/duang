{

  const SHADOW = 'https://shadow.elemecdn.com';
  const internalMap = {
    TimePicker: SHADOW + '/npm/jinkela-timepicker@1.3.2/umd.min.js',
    DatePicker: SHADOW + '/npm/jinkela-datepicker@1.3.2/umd.min.js',
    Forest: SHADOW + '/npm/jinkela-forest@1.1.1/umd.min.js',
    Cascader: SHADOW + '/npm/jinkela-cascader@1.1.0/umd.min.js',
    Checkbox: SHADOW + '/npm/jinkela-checkbox@1.1.0/umd.min.js',
    Radio: SHADOW + '/npm/jinkela-radio@1.1.0/umd.min.js',
    ClickTip: SHADOW + '/npm/jinkela-clicktip@1.1.0/umd.min.js'
  };

  window.def = factory => {
    let matched = (factory + '').match(/\([\s\S]*?\)/g) || [];
    matched = String(matched[0]).slice(1, -1);
    let names = matched.match(/[^,\s]+/g) || [];
    let deps = names.map(name => {
      if (name in internalMap) {
        return internalMap[name];
      } else {
        return 'components/' + name.replace(/\$/g, '/') + '.js';
      }
    });
    define(deps, factory);
  };

  window.req = dep => {
    let url;
    if (dep in internalMap) {
      dep = internalMap[dep];
      url = dep;
    } else if (/\W/.test(dep)) {
      dep = new Function('return `' + dep + '`')();
      url = dep;
    } else {
      url = `components/${dep.replace(/\$/g, '/')}.js`;
    }
    if (url in req.cache) return req.cache[url];
    req.cache[url] = new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      require([ url ], resolve, error => {
        void error;
        reject(new Error(`组件 <${dep}> 未找到`));
      });
    });
    return req.cache[url];
  };

  req.cache = {};

}
