const fakeData = new (require('../lib/fakedata'));
const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('/api', ctx => {
  ctx.set('Content-Type', 'application/json');
  ctx.body = JSON.stringify(require('../config'), 0, 2);
});

module.exports = router.routes();


