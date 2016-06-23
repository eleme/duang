const doAction = data => {
  let { action, args } = data || {};
  switch (action) {
    case 'confirm': return req('Confirm').then(Confirm => Confirm.popup(args));
    case 'get':
    case 'put':
    case 'delete':
    case 'post':
    case 'patch':
      {
        let body = JSON.stringify(args.body);
        return api([ depot.key, args.key ], { method: action, body }).then(doAction);
      }
    case 'reject': return Promise.reject(args);
    case 'resolve': return Promise.resolve(args);
  }
  return Promise.resolve(data);
};
