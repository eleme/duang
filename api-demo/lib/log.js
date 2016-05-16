module.exports = (ctx, next) => {
  return next().catch(error => {
    ctx.body = error.stack || error.message || error;
    ctx.status = 500;
  });
}; 
