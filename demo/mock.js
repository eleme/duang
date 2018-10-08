mock.get('/**/locale-datetime', () => {
  return { 'value': new Date().toLocaleString() };
});

mock.get('/**/now', () => {
  return { 'value': new Date() };
});

mock.get('/**/the-form', () => {
  return {
    action: 'open',
    args: { href: 'https://ele.me' }
  };
});

mock.get('/**/500', () => {
  let headers = { 'Content-Type': 'application/json' };
  let body = { name: 'HEHE_ERROR', message: '这是一个错误的列表' };
  return new Response(JSON.stringify(body), { status: 500, headers });
});

mock.get('/**/pager-list-data/count', () => 500);

mock.get('/**/filetoken', () => 'hehe');

mock.get('/**/filetoken/hehe', () => {
  let headers = { 'Content-Type': 'image/svg+xml' };
  let body = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 0 110 55">
      <path d="M 0 0 L 50 50 L 100 0" fill="none" stroke="#9b9ea0" stroke-width="10" />
    </svg>
  `.trim();
  return new Response(body, { status: 200, headers });
});

mock.get('/**/empty-list', () => []);

mock.get('/**/imageselector-options', () => [
  { 'src': 'https://fuss10.elemecdn.com/1/89/56d597e004abf8d30365009c4492bjpeg.jpeg', 'value': 'item 1' },
  { 'src': 'https://fuss10.elemecdn.com/7/d3/48a777a6b444dc317cc24d101220cjpeg.jpeg', 'value': 'item 2' },
  { 'src': 'https://fuss10.elemecdn.com/4/ff/bde8cd29387027b84824a95e0058bjpeg.jpeg', 'value': 'item 3' }
]);

mock.get('/**/pager-list-data', () => [
  { 'id': '1.json', 'a': 'one', 'b': 'hehe' },
  { 'id': '2.json', 'a': 'two', 'b': 'hehe' }
]);

mock.get('/**/string-map-abcd', () => ({
  a: '一个很长很长的描述 A',
  b: '一个很长很长的描述 B',
  c: '一个很长很长的描述 C',
  d: '一个很长很长的描述 D'
}));

mock.get('/**/the-filter', ({ searchParams }) => {
  let where = JSON.parse(searchParams.get('where') || '{}');
  return [
    { id: 1, title: '蒸羊羔', description: '蒸羊之法在《齐民要术．饮食篇》已有记载。' },
    { id: 2, title: '蒸熊掌' },
    { id: 3, title: '蒸鹿尾儿' },
    { id: 4, title: '烧花鸭', description: '烧花鸭是一道色香味俱全的地方名菜，属于河北菜。' },
    { id: 5, title: '烧雏鸡' },
    { id: 6, title: '烧子鹅', description: '烧子鹅是一道由鹅、姜、蒜等做成的美食。' }
  ].filter(row => {
    let result = true;
    if ('f1' in where && !~String(row.title).indexOf(where.f1)) result = false;
    if ('f2' in where && !~String(row.description).indexOf(where.f2)) result = false;
    return result;
  });
});

mock.get('/**/the-filter/before', ({ searchParams }) => {
  return confirm(searchParams.get('where'));
});

mock.get('/**/normal-list', () => [
  { id: 1, type: '菜名', title: '蒸羊羔', description: '蒸羊之法在《齐民要术．饮食篇》已有记载。' },
  { id: 2, type: '菜名', title: '蒸熊掌' },
  { id: 3, type: '菜名', title: '蒸鹿尾儿' },
  { id: 4, type: '菜名', title: '烧花鸭', description: '烧花鸭是一道色香味俱全的地方名菜，属于河北菜。' },
  { id: 5, type: '菜名', title: '烧雏鸡' },
  { id: 6, type: '菜名', title: '烧子鹅', description: '烧子鹅是一道由鹅、姜、蒜等做成的美食。' }
]);

mock.get('/**/link-list', () => [
  { id: 1, type: '菜名', title: '蒸羊羔', link: { where: { f1: '蒸羊羔' } } },
  { id: 2, type: '菜名', title: '蒸熊掌', link: { where: { f1: '蒸熊掌' } } },
  { id: 3, type: '菜名', title: '蒸鹿尾儿', link: { where: { f1: '蒸鹿尾儿' } } },
  { id: 4, type: '菜名', title: '烧花鸭', link: { where: { f1: '烧花鸭' } } },
  { id: 5, type: '菜名', title: '烧雏鸡', link: { where: { f1: '烧雏鸡' } } },
  { id: 6, type: '菜名', title: '烧子鹅', link: { where: { f1: '烧子鹅' } } }
]);

mock.get('/**/complex-list', () => [
  { id: 1, type: '菜名', title: '蒸羊羔', description: '蒸羊之法在《齐民要术．饮食篇》已有记载。' },
  { id: 2, type: '菜名', title: '蒸熊掌' },
  { id: 3, type: '菜名', title: '蒸鹿尾儿' },
  { id: 4, type: '菜名', title: '烧花鸭', description: '烧花鸭是一道色香味俱全的地方名菜，属于河北菜。' },
  { id: 5, type: '菜名', title: '烧雏鸡' },
  { id: 6, type: '菜名', title: '烧子鹅', description: '烧子鹅是一道由鹅、姜、蒜等做成的美食。' }
]);

mock({
  method: 'GET',
  pattern: '/**/complex-list/:id',
  handler: ({ params }) => [
    { id: 1, type: '菜名', title: '蒸羊羔', description: '蒸羊之法在《齐民要术．饮食篇》已有记载。' },
    { id: 2, type: '菜名', title: '蒸熊掌' },
    { id: 3, type: '菜名', title: '蒸鹿尾儿' },
    { id: 4, type: '菜名', title: '烧花鸭', description: '烧花鸭是一道色香味俱全的地方名菜，属于河北菜。' },
    { id: 5, type: '菜名', title: '烧雏鸡' },
    { id: 6, type: '菜名', title: '烧子鹅', description: '烧子鹅是一道由鹅、姜、蒜等做成的美食。' }
  ].find(item => item.id === +params.id),
  throttle: 500
});

mock.get('/**/the-options', () => [
  { value: 1, text: '蒸羊羔' },
  { value: 2, text: '蒸熊掌' },
  { value: 3, text: '蒸鹿尾儿' },
  { value: 4, text: '烧花鸭' },
  { value: 5, text: '烧雏鸡' },
  { value: 6, text: '烧子鹅' }
]);

mock.get('/**/components-list', () => [
  { id: 1, title: '蒸羊羔', value: 3, description: { tip: '蒸羊之法在《齐民要术．饮食篇》已有记载。' } },
  { id: 2, title: '蒸熊掌', value: 1, img: 'error' },
  { id: 3, title: '蒸鹿尾儿', value: 6, img: '../logo.png' },
  { id: 4, title: '烧花鸭', value: 5, description: { tip: '烧花鸭是一道色香味俱全的地方名菜，属于河北菜。' } },
  { id: 5, title: '烧雏鸡', value: 2 },
  { id: 6, title: '烧子鹅', value: 4, description: { tip: '烧子鹅是一道由鹅、姜、蒜等做成的美食。' } }
]);

mock.get('/**/the-list-data', () => [
  { 'id': '1', 'a': { 'text': 'one', 'tip': 'hehe<br/>haha<br/>hoho' }, 'b': 'b1' },
  { 'id': '2', 'a': 'two', 'b': 'b2', 'img': '../logo.png' },
  { 'id': '3', 'a': 'tree', 'b': '', 'img': 'error' },
  { 'id': '4', 'a': 'four' },
  { 'id': '5', 'a': 'five', 'b': 'b5' }
]);

mock.get('/**/the-list-data-2', () => [
  { 'id': '1', 'a': { 'text': 'one', 'tip': 'hehe<br/>haha<br/>hoho' } },
  { 'id': '2', 'a': 'two', 'img': '../logo.png' },
  { 'id': '3', 'a': 'tree', 'img': 'error' },
  { 'id': '4', 'a': 'four' },
  { 'id': '5', 'a': 'five' }
]);

mock.get('/**/mergable-list', () => [
  { id: 1, type: 'l1', name: 'hehe 1', tag: 'testing', value: 1 },
  { id: 2, type: 'l1', name: 'hehe 2', tag: 'testing', value: 2 },
  { id: 3, type: 'l2', name: 'hehe 3', tag: 'testing', value: 3 },
  { id: 4, type: 'l2', name: 'hehe 4', tag: 'normal', value: 4 },
  { id: 5, type: 'l2', name: 'hehe 5', tag: 'testing', value: 5 },
  { id: 6, type: 'l2', name: 'hehe 6', tag: 'testing', value: 6 },
  { id: 7, type: 'l3', name: 'hehe 7', tag: 'testing', value: 7 }
]);

mock.get('/**/value-list', () => [
  { 'value': 'item 1', 'html': 'i<strong style="color: red;">te</strong>m 1' },
  { 'value': 'item 2' },
  { 'value': 'item 3' },
  { 'value': 'item 4' },
  { 'value': 'item 5' },
  { 'value': 'item 6' }
]);

mock.post('/**/upload', ctx => {
  let url = URL.createObjectURL(ctx.body);
  return url;
});

[ 'post', 'put', 'delete', 'patch' ].forEach(method => {
  mock[method]('/**', ctx => {
    let title = '请求已拦截';
    let text = `<code style="font-size:14px;">POST ${ctx.pathname}${ctx.search}</code><br/>`;
    if (ctx.body && !(ctx.body instanceof Blob)) {
      text += `<pre style="font-size:12px;">${JSON.stringify(ctx.body, null, 2)}</pre>`;
    }
    return { action: 'success', args: { text, title } };
  });
});
