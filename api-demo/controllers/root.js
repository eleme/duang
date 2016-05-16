const KoaRouter = require('koa-router');
const router = new KoaRouter();
const argollector = require('argollector');
const { version } = require('../package');

const SRC = argollector['--src'] || `//github.elemecdn.com/eleme/duang/${version}/src/duang.js`;

router.get('/', (ctx, next) => {
  ctx.set('Content-Type', 'text/html');
  ctx.body = `<script src="${SRC}" config="/api"></script>`;
});

module.exports = router.routes();
