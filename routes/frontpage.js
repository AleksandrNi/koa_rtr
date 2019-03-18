const Koa = require('koa');
const app = new Koa();
const path = require('path');
const config = require('config');
const fs = require('fs');
const sendFile = require('./workers/sendFile');
const removeFile = require('./workers/removeFile');

exports.get = async function(ctx, next) {

  ctx.body = ctx.render('welcome.pug');
  await next();
};

exports.get_file = async function(ctx, next) {
  console.log(ctx.request.body);

  ctx.body = ctx.render('welcome.pug');

  await next();
};

exports.post = async function(ctx, next) {
  let fileName = ctx.request.url.slice(1);

  ctx.file = {};
  ctx.file.name = fileName;
  ctx.file.method = ctx.request.method;

  await fs.writeFile(path.join(config.get('filesRoot'), fileName), ctx.request.body, (err) => {
    // throws an error, you could also catch it here
    if (err) console.error(err);
  });

  await next();



/*  ctx.redirect('/');*/


/*  ctx.body = ctx.render('welcome.pug');*/
};


exports.delete = async function(ctx, next) {
  console.log(ctx.request.body);

  await next();
};
