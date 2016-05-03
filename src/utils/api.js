var api = (url, options) => {
  let meta = document.querySelector('meta[name=api]');
  let base = meta ? meta.getAttribute('content') : '';
  options = Object.assign({ credentials: 'include' }, options);
  if (options.body) {
    if (!options.headers) options.headers = {};
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
  }
  if (base[base.length - 1] !== '/' && url[0] !== '/') url = '/' + url;
  return fetch(base + url, options).then(response => {
    let type = /\bjson\b/.test(response.headers.get('content-type')) ? 'json' : 'text';
    if (response.status < 400) {
      return response[type]();
    } else {
      return response[type]().then(result => { throw result; });
    }
  });
};
