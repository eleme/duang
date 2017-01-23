{
  let { headers } = _duang;
  ['logo', 'session', 'config'].forEach(scheme => {
    let basePattern = location.origin + location.pathname + scheme;
    FCeptor.get(new RegExp(basePattern), ctx => {
      ctx.response = new Response(
        JSON.stringify(_duang.get(scheme, ctx.request.url)), { headers });
      return false;
    });
    FCeptor.put(new RegExp(basePattern), ctx => {
      ctx.request.json().then(raw => {
        if (scheme === 'config' && raw.upload) {
          let data = jsyaml.safeLoad(Base64.decode(raw.upload));
          if ('schemes' in data) {
            data.schemes.forEach(scheme => {
              scheme.id = _duang.id;
              ['actions', 'fields', 'operations', 'inputs'].forEach(action => {
                scheme[action].data.forEach(item => item.id = _duang.id);
              });
              _duang._schemes.forEach(action => {
                scheme[action] = {
                  data: scheme[action].data || [],
                  title: '查看',
                  key: scheme.key
                };
              });
              return scheme;
            });
          }
          raw.upload = data;
        }
        ctx.response = new Response(
          JSON.stringify(_duang.put(scheme, ctx.request.url, raw)), { headers });
      });
      return false;
    });
  });
}
