void function() {
  addEventListener('hashchange', this);
  addEventListener('DOMContentLoaded', this);
}.call(() => {
  require([ '/modules/' + (new UParams().module || 'default') + '.js' ], Module => {
    document.body.innerHTML = '';
    new Module().renderTo(document.body);
  });
});
