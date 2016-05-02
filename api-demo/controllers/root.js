const fakeData = new (require('../lib/fakedata'));
const KoaRouter = require('koa-router');
const router = new KoaRouter();

router.get('/', ctx => {
  ctx.body = require('../config');
});

module.exports = router.routes();
