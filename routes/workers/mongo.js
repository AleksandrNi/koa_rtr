const fs = require('fs');
const path = require('path');
const config = require('config');
const mime  = require('mime-types');
const File = require('../../models/File');

const methodPost = require(path.join(config.get('workersRoot'), 'methodPost'));
const methodPut = require(path.join(config.get('workersRoot'), 'methodPut'));

exports.func = async function(ctx) {
  let ctxProps;
  let ctxBody;
  let ctxStatus;
  let fileMime;

  if (ctx.file.method == "POST") {

    ctxProps = await methodPost(ctx.file.name, ctx.file.path, ctx.file.type, ctxBody, ctxStatus, fileMime);

  } else if (ctx.file.method == "GET" && ctx.file.dir == 'def') {

    let file = await File.findOne({fileName: ctx.file.name});

     if (!file) {
       console.error('File with the same name doesnt exist')
       return;
     }
      fileIn = fs.createReadStream(path.join(config.get('filesRoot'), file.fileName));
      fileMime = file.mime;
      ctxStatus = 200;
      ctxBody = fileIn;

  } else if (ctx.file.method == "PUT" && ctx.file.dir == 'files') {

    ctxProps = await methodPut(ctx.file.name, ctx.file.path, ctx.file.type, ctxBody, ctxStatus, fileMime);


  } else if (ctx.file.method == "GET" && ctx.file.dir == 'files') {
   let file = await File.findOne({fileName: ctx.file.name});

   if  (!file) {
     console.error('File with the same name doesnt exist')
     ctxStatus = 404;
     fileMime = 'null';
     ctxBody = 'File with the same name doesnt exist';

   } else {

     fileIn = fs.createReadStream(path.join(config.get('filesRoot'), file.fileName));

     fileMime = file.mime;
     ctxStatus = 200;
     ctxBody = fileIn;
   }
  }
  ctxBody = ctxBody || ctxProps.ctxBody;
  ctxStatus = ctxStatus || ctxProps.ctxStatus;
  fileMime = fileMime || ctxProps.fileMime;
  console.log(ctxProps);
  ctx.response.set("content-type", fileMime);
  ctx.status = ctxStatus;
  ctx.body = ctxBody;

};
