const def = factory => { // eslint-disable-line no-unused-vars
  let matched = (factory + '').match(/\([\s\S]*?\)/g) || [];
  matched = String(matched[0]).slice(1, -1);
  let deps = matched.match(/[^,\s]+/g) || [];
  deps = deps.map(item => 'components/' + item.replace(/\$/g, '/') + '.js');
  define(deps, factory);
};

const req = dep => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
  let name = dep.replace(/\$/g, '/');
  require([ `components/${name}.js` ], resolve, error => {
    console.error(error);
    throw new Error(`Unknown component <${name}>`);
  });
});
