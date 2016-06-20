const KoaRouter = require('koa-router');
const router = new KoaRouter({ prefix: '/api' });

let categories = [
  { value: '1', text: 'Item 01' },
  { value: '2', text: 'Item 02' }
];

let count = 0;

let uploadCache = [];

router.post('/confirm_and_submit', (ctx, next) => {
  let body = ctx.request.body;
  if (!body.file) {
    ctx.status = 400;
    ctx.body = { message: 'file is required' };
    return;
  }
  let file = new Buffer(body.file, 'base64');
  let token = uploadCache.push(file) - 1;
  ctx.body = {
    action: 'confirm', 
    args: {
      text: `file.length === ${file.length}`,
      onYes: {
        action: 'post',
        args: { key: 'feedback', body: { token, status: 'ok' } }
      },
      onCancel: {
        action: 'post',
        args: { key: 'feedback', body: { token, status: 'cancel' } }
      },
    }
  };
});

router.get('/confirm_and_submit/message', (ctx, next) => {
  let where = JSON.parse(ctx.query.where || '{}');
  let result = categories.find(item => item.value === where.category);
  if (!result) ctx.body = { html: '' };
  ctx.body = { html: `<h1>count === ${count}</h1>` };
});

router.get('/confirm_and_submit/categories', (ctx, next) => {
  ctx.body = categories;
});

router.post('/confirm_and_submit/feedback', (ctx, next) => {
  let { token, status } = ctx.request.body;
  switch (status) {
    case 'cancel':
      ctx.body = { action: 'reject' };
      break;
    case 'ok':
      count += uploadCache[token].length;
      ctx.body = null;
      break;
  }
  uploadCache[token] = null;
});

module.exports = router.routes();
