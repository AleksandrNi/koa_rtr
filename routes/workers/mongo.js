const fs = require('fs');
const path = require('path');
const config = require('config');
const mime  = require('mime-types');
const File = require('../../models/File');

exports.func = async function(ctx) {

  let fileName = ctx.file.name;
  let ctxBody;

  if (ctx.file.method == "POST" && ctx.file.dir == 'def') {

    let existedFile = await File.findOne({fileName: ctx.file.name});

    if  (!existedFile) {

      await fs.writeFile(path.join(config.get('filesRoot'), fileName), ctx.request.body, (err) => {
        // throws an error, you could also catch it here
        if (err) console.error(err);
      });

      let type = mime.lookup(path.join(config.get('filesRoot'), fileName));
      let size =  getFilesizeInBytes(path.join(config.get('filesRoot'), fileName));

      let file = new File({
        fileName: fileName,
        mime: type,
        size: size
      });

      await file.save()
      .then(result => console.log(result))
      .catch(err => {

        if(err.name == 'ValidationError') {
          console.error('ERROR: '+ err.errors.fileName.message);
          
        } else {
          console.error(err)
        };
      });

    } else {

      ctxBody = 'File with the same name exists';
      ctx.status = 403;
      console.error('File with the same name exists');

    }

  } else if (ctx.file.method == "GET" && ctx.file.dir == 'def') {

   let file = await File.findOne({fileName: ctx.file.name});

   if  (!file) {
     console.error('File with the same name doesnt exist')
     return;
   }
    fileIn = fs.createReadStream(path.join(config.get('filesRoot'), file.fileName));
    ctx.response.set("content-type", file.mime);
    ctxBody = fileIn;

  } else if (ctx.file.method == "PUT" && ctx.file.dir == 'files') {

   let file = await File.findOne({fileName: ctx.file.name});

   if  (!file) {
     console.error('File with the same name doesnt exist')
     ctx.status = 404;
     ctxBody = 'File with the same name doesnt exist';

   } else {

     await fs.writeFile(path.join(config.get('filesRoot'), file.fileName), ctx.request.body, (err) => {
       // throws an error, you could also catch it here
       if (err) console.error(err);
     });

     let type = mime.lookup(path.join(config.get('filesRoot'), fileName));
     let size =  getFilesizeInBytes(path.join(config.get('filesRoot'), fileName));

     file.mime = type;
     file.size = size;

     await file.save()

     fileIn = fs.createReadStream(path.join(config.get('filesRoot'), file.fileName));
     ctx.response.set("content-type", file.mime);
     ctxBody = fileIn;

   }

  } else if (ctx.file.method == "GET" && ctx.file.dir == 'files') {
   let file = await File.findOne({fileName: ctx.file.name});

   if  (!file) {
     console.error('File with the same name doesnt exist')
     ctx.status = 404;
     ctxBody = 'File with the same name doesnt exist';

   } else {

     fileIn = fs.createReadStream(path.join(config.get('filesRoot'), file.fileName));
     ctx.response.set("content-type", file.mime);
     ctx.length;
     ctxBody = fileIn;
   }
  }

  ctx.body = ctxBody;

};

// get filesize // doesn't work with os  windows
function getFilesizeInBytes(filename) {
    let stats = fs.statSync(filename);
    let fileSizeInBytes = stats["size"]

    return fileSizeInBytes
};
