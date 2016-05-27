const KoaRouter = require('koa-router');
const router = new KoaRouter({ prefix: '/api' });

router.get('/user', (ctx, next) => {
  ctx.body = {
    username: '柳荣一',
    permissions: [ 'LIST2' ]
  };
});

module.exports = router.routes();
