const init = new function() {
  let $config;
  if (window.config) {
    $config = Promise.resolve(config);
  } else {
    $config = api('').then(result => window.config = result);
  }
  let loadModule = () => new Promise((resolve, reject) => {
    require([ 'modules/' + (new UParams().module || 'default') + '.js' ], Module => {
      document.body.innerHTML = '';
      new Module().renderTo(document.body);
      resolve();
    }, reject);
  });
  return () => $config.then(loadModule);
};

addEventListener('DOMContentLoaded', init);
addEventListener('hashchange', init);
