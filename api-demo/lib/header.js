module.exports = (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
  } else {
    next();
  }
  if (ctx.headers['access-control-request-method']) {
    ctx.set('Access-Control-Allow-Methods', ctx.headers['access-control-request-method']);
  }
  if (ctx.headers['access-control-request-headers']) {
    ctx.set('Access-Control-Allow-Headers', ctx.headers['access-control-request-headers']);
  }
  if (ctx.headers['origin']) ctx.set('Access-Control-Allow-Origin', ctx.headers['origin']);
  ctx.set('Access-Control-Allow-Credentials', true);
};
