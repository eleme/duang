{
  let { headers } = _duang;
  let basePattern = location.origin + location.pathname + 'schemes';
  FCeptor.get(new RegExp(`${basePattern}\\?`), ctx => {
    ctx.response = new Response(
      JSON.stringify(_duang.get('schemes', ctx.request.url)), { headers });
    return false;
  });
  FCeptor.post(new RegExp(`${basePattern}\$`), ctx => {
    ctx.request.json().then(raw => {
      ctx.response = new Response(
        JSON.stringify(_duang.post('schemes', ctx.request.url, raw)), { headers });
    });
    return false;
  });
  FCeptor.get(new RegExp(`${basePattern}\/.*`), ctx => {
    ctx.response = new Response(
      JSON.stringify(_duang.get('schemes', ctx.request.url.replace(/\?.*/, ''))), { headers });
    return false;
  });
  FCeptor.put(new RegExp(`${basePattern}\/.*`), ctx => {
    ctx.request.json().then(raw => {
      ctx.resposne = new Response(
        JSON.stringify(_duang.put('schemes', ctx.request.url, raw)), { headers });
    });
    return false;
  });
  FCeptor.delete(new RegExp(`${basePattern}\/.*`), ctx => {
    ctx.response = new Response(
      JSON.stringify(_duang.delete('schemes', ctx.request.url)), { headers });
    return false;
  });
}
