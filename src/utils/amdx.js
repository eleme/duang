const def = factory => { // eslint-disable-line no-unused-vars
  let matched = (factory + '').match(/\([\s\S]*?\)/g) || [];
  matched = String(matched[0]).slice(1, -1);
  let deps = matched.match(/[^,\s]+/g) || [];
  deps = deps.map(item => 'components/' + item.replace(/\$/g, '/') + '.js');
  define(deps, factory);
};

const req = dep => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
  require([ 'components/' + dep.replace(/\$/g, '/') + '.js' ], resolve, reject);
});
