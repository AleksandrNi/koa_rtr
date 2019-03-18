const fs = require('fs');
const path = require('path');
const config = require('config');
const mime  = require('mime-types');
const File = require('../../models/File');

exports.func = async function(ctx) {

  let name = ctx.file.name;
  let type = mime.lookup(path.join(config.get('filesRoot'), name));
  let size =  getFilesizeInBytes(path.join(config.get('filesRoot'), name));

  console.log(   name   );
  console.log(   type   );
  console.log(   size   );
if (ctx.file.method == "POST") {

  await fs.writeFile(path.join(config.get('filesRoot'), fileName), ctx.request.body, (err) => {
    // throws an error, you could also catch it here
    if (err) console.error(err);
  });

  let file = new File({
    fileName: name,
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

} else if (ctx.file.method == "GET") {
  let file = await File.findOne({fileName: ctx.file.name});

  if  (!file) return console.error('File with the same name doesnt exist');

  fileIn = fs.createReadStream(path.join(config.get('filesRoot'), file.fileName));
  fileIn
    .pipe(ctx.res);


}



};

// get filesize // doesn't work with for windows
function getFilesizeInBytes(filename) {
    let stats = fs.statSync(filename);
    let fileSizeInBytes = stats["size"]

    return fileSizeInBytes
};
