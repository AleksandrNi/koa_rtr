const formidable = require('koa2-formidable');

const Koa = require('koa')
const app = new Koa()

exports.init = app => app.use(formidable({}));
