const def = factory => { // eslint-disable-line no-unused-vars
  let matched = (factory + '').match(/\([\s\S]*?\)/g) || [];
  matched = String(matched[0]).slice(1, -1);
  let deps = matched.match(/[^,\s]+/g) || [];
  deps = deps.map(item => 'components/' + item.replace(/\$/g, '/') + '.js');
  define(deps, factory);
};

const req = dep => {
  let url;
  if (/^(?:https?:)\/\//.test(dep)) {
    url = dep;
  } else {
    url = `components/${dep.replace(/\$/g, '/')}.js`;
  }
  if (url in req.cache) return req.cache[url];
  req.cache[url] = new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    require([ url ], resolve, error => {
      reject(new Error(`组件 <${dep}> 未找到`));
    });
  });
  return req.cache[url];
};

req.cache = {};
