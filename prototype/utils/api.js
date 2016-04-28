var api = (url, options) => {
  options = Object.assign({ credentials: 'include' }, options);
  if (options.body) {
    if (!options.headers) options.headers = {};
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
  }
  return fetch(url, options).then(response => {
    let type = /\bjson\b/.test(response.headers.get('content-type')) ? 'json' : 'text';
    if (response.status < 400) {
      return response[type]();
    } else {
      response[type]().then(result => { throw result; });
    }
  });
};
