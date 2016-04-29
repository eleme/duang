const fakeData = new (require('../lib/fakedata'));
const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('/list1', (ctx, next) => {
  let { offset, limit } = ctx.query;
  offset |= 0;
  limit |= 0;
  ctx.body = fakeData.slice(offset, offset + limit);
});

router.post('/list1', (ctx, next) => {
  let data = ctx.request.body;
  fakeData.push(data);
  ctx.body = {};
});

router.get('/list1/:id', (ctx, next) => {
  let id = +ctx.params.id;
  for (let item of fakeData) if (item.id === id) {
    item = Object.assign({}, item);
    delete item.id;
    ctx.body = item;
  }
});

router.delete('/list1/:id', (ctx, next) => {
  let id = +ctx.params.id;
  for (let i = 0; i < fakeData.length; i++) if (fakeData[i].id === id) {
    fakeData.splice(i, 1);
    ctx.body = {};
  }
});

router.put('/list1/:id', (ctx, next) => {
  let id = +ctx.params.id;
  let data = ctx.request.body;
  for (let item of fakeData) if (item.id === id) {
    for (let i in item) if (i !== 'id') item[i] = data[i];
    ctx.body = {};
  }
});

router.post('/list1/:id/hx', (ctx, next) => {
  let id = +ctx.params.id;
  for (let item of fakeData) if (item.id === id) {
    item.name = '已和谐';
    ctx.body = {};
  }
});

module.exports = router.routes();
