const Koa = require('koa');
const app = new Koa();
const path = require('path');
const config = require('config');
const fs = require('fs');
const os = require('os');
const {uploadFile} = require('./workers/upload');


exports.get = async function(ctx, next) {
  ctx.body = ctx.render('welcome.pug');
  await next();
};

exports.get_file = async function(ctx, next) {

  ctx.file = {};
  ctx.file.method = ctx.request.method;
  ctx.file.name = ctx.params.filename;

  ctx.params.dir == 'files'? ctx.file.dir = ctx.params.dir : ctx.file.dir = 'def';
  console.log(ctx.file.dir);
  await next();

};

exports.post_file = async function(ctx, next) {

const file = ctx.request.files.file;
const filePath = file.path;

  ctx.file = {};
  ctx.file.method = ctx.request.method; // POST
  ctx.file.name = file.name; // readme.txt
  ctx.file.path = file.path; //full path
  ctx.file.type = file.type; //mime type

  await next();

};

exports.put = async function(ctx, next) {
  ctx.file = {};
  ctx.file.method = ctx.request.method;
  ctx.file.name = ctx.params.filename;

  ctx.params.dir == 'files'? ctx.file.dir = ctx.params.dir : ctx.file.dir = 'def';

  await next();

};

exports.get_files_file = async function(ctx, next) {

  ctx.file = {};
  ctx.file.method = ctx.request.method;
  ctx.file.name = ctx.params.filename;

  ctx.params.dir == 'files'? ctx.file.dir = ctx.params.dir : ctx.file.dir = 'def';

  await next();

};

/*exports.delete = async function(ctx, next) {
  console.log(ctx.request.body);

  await next();
};*/
