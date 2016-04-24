const def = factory => {
  let deps = String((factory + '').match(/\(([\s\S]*?)\)|$/)[1] || '').match(/[^,\s]+/g) || [];
  deps = deps.map(item => '/components/' + item + '.js');
  if ((factory + '').match(/function\s*\*/)) factory = co.bind(null, factory);
  define(deps, factory);
};
