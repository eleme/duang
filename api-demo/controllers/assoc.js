const KoaRouter = require('koa-router');
const router = new KoaRouter({ prefix: '/api' });

let table1 = [
  { 'id': 1, 'name': 'one' },
  { 'id': 2, 'name': 'two' }
];

let table2 = [
  { id: 1, parent_id: 1, name: 'aaaa' },
  { id: 2, parent_id: 2, name: 'bbbb' },
  { id: 3, parent_id: 1, name: 'cccc' },
  { id: 4, parent_id: 2, name: 'dddd' }
];

router.get('/assoc/:parent_id', (ctx, next) => {
  ctx.body = table2.filter(item => item.parent_id == ctx.params.parent_id);
});

router.get('/assoc', (ctx, next) => {
  ctx.body = table1;
});


module.exports = router.routes();
