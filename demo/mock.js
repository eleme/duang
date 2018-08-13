FCeptor.post(/^/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  let title = '请求已拦截';
  let reqMime = ctx.request.headers.get('Content-Type');
  let key;
  switch (true) {
    case /\bjson\b/.test(reqMime):
      key = 'json';
      break;
    case /\btext\b/.test(reqMime):
      key = 'text';
      break;
    default:
      key = 'blob';
  }
  return new Promise(resolve => {
    let promise = ctx.request[key]().then(data => {
      let text = `<code style="font-size:14px;">POST ${ctx.request.url}</code><br/>`;
      if (key === 'json') {
        text += `<pre style="font-size:12px;">${JSON.stringify(data, null, 2)}</pre>`;
      } else {
        text += key;
        // ctx.response = new Response(JSON.stringify('../logo.png'), { status: 200, headers });
        // return false;
      }
      let body = { action: 'success', args: { text, title, result: { action: 'noop' } } };
      ctx.response = new Response(JSON.stringify(body), { status: 200, headers });
      return false;
    });
    setTimeout(() => { resolve(promise); }, 500);
  });
});

FCeptor.get(/now/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  let body = { 'value': new Date() };
  ctx.response = new Response(JSON.stringify(body), { status: 200, headers });
  return false;
});

FCeptor.post(/the-form/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  let body = {
    'action': 'open',
    'args': {
      'href': 'https://ele.me'
    }
  };
  ctx.response = new Response(JSON.stringify(body), { status: 200, headers });
  return false;
});

FCeptor.get(/\/500(\?.*)?$/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  let body = { name: 'HEHE_ERROR', message: '这是一个错误的列表' };
  ctx.response = new Response(JSON.stringify(body), { status: 500, headers });
  return false;
});

FCeptor.get(/\/pager-list-data\.json\/count(\?.*)?$/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  ctx.response = new Response(JSON.stringify(500), { status: 200, headers });
  return false;
});

FCeptor.post(/\bfiletoken$/, ctx => {
  console.log(1);
  let headers = { 'Content-Type': 'application/json' };
  let body = 'hehe';
  ctx.response = new Response(JSON.stringify(body), { status: 200, headers });
  return false;
});

FCeptor.get(/\bfiletoken\/hehe$/, ctx => {
  console.log(1);
  let headers = { 'Content-Type': 'image/svg+xml' };
  let body = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 0 110 55"><path d="M 0 0 L 50 50 L 100 0" fill="none" stroke="#9b9ea0" stroke-width="10" /></svg>';
  ctx.response = new Response(body, { status: 200, headers });
  return false;
});

FCeptor.get(/\bempty-list(\?.*$|$)/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  ctx.response = new Response(JSON.stringify([]), { status: 200, headers });
  return false;
});

FCeptor.get(/\bimageselector-options(\?.*$|$)/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  let body = JSON.stringify([
    { 'src': 'https://fuss10.elemecdn.com/1/89/56d597e004abf8d30365009c4492bjpeg.jpeg', 'value': 'item 1' },
    { 'src': 'https://fuss10.elemecdn.com/7/d3/48a777a6b444dc317cc24d101220cjpeg.jpeg', 'value': 'item 2' },
    { 'src': 'https://fuss10.elemecdn.com/4/ff/bde8cd29387027b84824a95e0058bjpeg.jpeg', 'value': 'item 3' }
  ]);
  ctx.response = new Response(body, { status: 200, headers });
  return false;
});

FCeptor.get(/\bpager-list-data(\?.*$|$)/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  let body = JSON.stringify([
    { 'id': '1.json', 'a': 'one', 'b': 'hehe' },
    { 'id': '2.json', 'a': 'two', 'b': 'hehe' }
  ]);
  ctx.response = new Response(body, { status: 200, headers });
  return false;
});

FCeptor.get(/\bstring-map-abcd(\?.*$|$)/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  let body = JSON.stringify({
    a: '一个很长很长的描述 A',
    b: '一个很长很长的描述 B',
    c: '一个很长很长的描述 C',
    d: '一个很长很长的描述 D'
  });
  ctx.response = new Response(body, { status: 200, headers });
  return false;
});

FCeptor.get(/\bthe-list-data(\?.*$|$)/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  let body = JSON.stringify([
    { 'id': '1', 'a': { 'text': 'one', 'tip': 'hehe<br/>haha<br/>hoho' }, 'b': 'b1' },
    { 'id': '2', 'a': 'two', 'b': 'b2', 'img': '../logo.png' },
    { 'id': '3', 'a': 'tree', 'b': '', 'img': 'error' },
    { 'id': '4', 'a': 'four' },
    { 'id': '5', 'a': 'five', 'b': 'b5' }
  ]);
  ctx.response = new Response(body, { status: 200, headers });
  return false;
});

FCeptor.get(/\bthe-list-data-2(\?.*$|$)/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  let body = JSON.stringify([
    { 'id': '1.json', 'a': { 'text': 'one', 'tip': 'hehe<br/>haha<br/>hoho' } },
    { 'id': '2.json', 'a': 'two', 'img': '../logo.png' },
    { 'id': '3.json', 'a': 'tree', 'img': 'error' },
    { 'id': '4.json', 'a': 'four' },
    { 'id': '5.json', 'a': 'five' }
  ]);
  ctx.response = new Response(body, { status: 200, headers });
  return false;
});

FCeptor.get(/\bvalue-list(\?.*$|$)/, ctx => {
  let headers = { 'Content-Type': 'application/json' };
  let body = JSON.stringify([
    { 'value': 'item 1', 'html': 'i<strong style="color: red;">te</strong>m 1' },
    { 'value': 'item 2' },
    { 'value': 'item 3' },
    { 'value': 'item 4' },
    { 'value': 'item 5' },
    { 'value': 'item 6' }
  ]);
  ctx.response = new Response(body, { status: 200, headers });
  return false;
});
