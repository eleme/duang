#!/usr/bin/env node
'use strict';

const KoaRouter = require('koa-router');
const KoaBodyParser = require('koa-bodyparser');
const koa = new (require('koa'));

koa.use(KoaBodyParser());
koa.use(require('./lib/header'));

{
  const router = new KoaRouter();
  router.get('/', ctx => {
    ctx.body = require('./config');
  });
  koa.use(router.routes());
}

koa.use(require('./controllers/list1'));
koa.use(require('./controllers/list2'));

koa.listen(1234);
