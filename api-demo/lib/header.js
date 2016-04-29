module.exports = (ctx, next) => {
  if (ctx.method === 'OPTIONS') {
    ctx.status = 204;
  } else {
    next();
  }
  ctx.set({
    'Access-Control-Allow-Methods': ctx.headers['access-control-request-method'],
    'Access-Control-Allow-Headers': ctx.headers['access-control-request-headers'],
    'Access-Control-Allow-Origin': ctx.headers['origin'],
    'Access-Control-Allow-Credentials': true
  });
};
