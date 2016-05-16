#!/usr/bin/env node
'use strict';

const KoaRouter = require('koa-router');
const KoaBodyParser = require('koa-bodyparser');
const koa = new (require('koa'));

koa.use(KoaBodyParser());
koa.use(require('./lib/header'));
koa.use(require('./lib/log'));

require('glob').sync('./controllers/**/*.js').forEach(name => koa.use(require(name)));

koa.listen(1234);
