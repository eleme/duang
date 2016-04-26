const init = () => {
  require([ '/modules/' + (new UParams().module || 'default') + '.js' ], Module => {
    document.body.innerHTML = '';
    new Module().renderTo(document.body);
  });
};

addEventListener('hashchange', init);
addEventListener('DOMContentLoaded', init);
