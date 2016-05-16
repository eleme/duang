const KoaRouter = require('koa-router');
const fetch = require('node-fetch');
const router = new KoaRouter();
const fs = require('fs');

const $index = fetch('http://raw.githubusercontent.com/eleme/duang/0.0.3/src/index.html').then(response => {
  return response.text();
});
router.get('/', (ctx, next) => {
  return $index.then(result => {
    ctx.set('Content-Type', 'text/html');
    ctx.body = result.replace(/\{\{API\}\}/g, '//127.0.0.1:1234/api');
  }).catch(error => {
    console.log(error.stack);
    ctx.status = 500;
    ctx.body = error.stack;
  });
});

module.exports = router.routes();
