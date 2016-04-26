const def = factory => {
  let deps = String((factory + '').match(/\(([\s\S]*?)\)|$/)[1] || '').match(/[^,\s]+/g) || [];
  deps = deps.map(item => '/components/' + item.replace(/\$/g, '/') + '.js');
  if ((factory + '').match(/^\s*function\s*\*/)) factory = co.bind(null, factory);
  define(deps, factory);
};

const req = dep => new Promise((resolve, reject) => {
  require([ '/components/' + dep.replace(/\$/g, '/') + '.js' ], resolve, reject);
});
