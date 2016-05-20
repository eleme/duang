const init = new function() {
  let $config;
  if (window.config) {
    $config = Promise.resolve(config);
  } else {
    $config = api('').then(result => window.config = result);
  }
  const loadModule = () => new Promise((resolve, reject) => {
    require([ 'modules/' + (new UParams().module || 'default') + '.js' ], Module => {
      if (init.module) document.body.removeChild(init.module.element);
      init.module = new Module().renderTo(document.body);
      resolve();
    }, reject);
  });
  return () => $config.then(loadModule);
};

addEventListener('DOMContentLoaded', init);
addEventListener('hashchange', init);
