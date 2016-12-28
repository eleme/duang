{
  let { headers } = _duang;
  let basePattern = `${location.origin}/schemes\/(.*)\/(operations\|inputs\|fields\|filters\|actions)`;
  FCeptor.get(new RegExp(`${basePattern}\\?`), ctx => {
    let pattern = new RegExp(basePattern);
    let [origin, key, action] = ctx.request.url.match(pattern);
    if (!key) throw new Error('Scheme::key 不能为空');
    MOCK_DATA.schemes.find(scheme => {
      if (scheme.key === key) {
        ctx.response = new Response(
          JSON.stringify(scheme[action].data), { headers });
        return scheme;
      }
    });
    return false;
  });
  FCeptor.post(new RegExp(`${basePattern}$`), ctx => {
    let pattern = new RegExp(basePattern);
    let [origin, key, action] = ctx.request.url.match(pattern);
    if (!key) throw new Error('Scheme::key 不能为空');
    MOCK_DATA.schemes.find(scheme => {
      if (scheme.key === key) {
        ctx.request.json().then(raw => {
          scheme[action].data.push(Object.assign(raw, { id: this.id }));
        });
      }
    });
    return false;
  });
  FCeptor.get(new RegExp(`${basePattern}\/.*`), ctx => {
    let pattern = new RegExp(`${basePattern}\/(.*)`);
    let [origin, key, action, id] = ctx.request.url.match(pattern);
    if (!key) throw new Error('Scheme::key 不能为空');
    MOCK_DATA.schemes.find(scheme => {
      if (scheme.key === key) {
        ctx.response = new Response(
          JSON.stringify(_duang.refactor(scheme[action].data.find(item => +item.id === +id))), { headers });
        return scheme;
      }
    });
    return false;
  });
  FCeptor.put(new RegExp(`${basePattern}\/.*`), ctx => {
    let pattern = new RegExp(`${basePattern}\/(.*)`);
    let [origin, key, action, id] = ctx.request.url.match(pattern);
    if (!key) throw new Error('Scheme::key 不能为空');
    MOCK_DATA.schemes.find(scheme => {
      if (scheme.key === key) {
        scheme[action].data.find((item, index) => {
          if (+item.id === +id) {
            ctx.request.json().then(raw => {
              Object.assign(scheme[action].data[index], raw);
            });
            return item;
          }
        });
      }
    });
    return false;
  });
  FCeptor.delete(new RegExp(`${basePattern}\/.*`), ctx => {
    let pattern = new RegExp(`${basePattern}\/(.*)`);
    let [origin, key, action, id] = ctx.request.url.match(pattern);
    if (!key) throw new Error('Scheme::key 不能为空');
    MOCK_DATA.schemes.find(scheme => {
      if (scheme.key === key) {
        scheme[action].data.find((item, index) => {
          if (+item.id === +id) {
            return scheme[action].data.splice(index, 1);
          }
        });
      }
    });
    return false;
  });
}
