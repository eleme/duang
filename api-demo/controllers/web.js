const KoaRouter = require('koa-router');
const router = new KoaRouter();
const fs = require('fs');

router.get('/web', (ctx, next) => {
  let html = fs.readFileSync('../src/index.html');
  ctx.set('Content-Type', 'text/html');
  ctx.body = html;
});

module.exports = router.routes();
