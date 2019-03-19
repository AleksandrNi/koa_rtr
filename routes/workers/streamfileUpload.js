const fs = require('fs');
const path = require('path');
const config = require('config');
const mime  = require('mime-types');
const File = require('../../models/File');
const getFilesizeInBytes = require(path.join(config.get('workersRoot'), 'getFileSize'));


module.exports = async function streamFileUpload (fileName, filePath, fileType, ctxBody, ctxStatus) {

  const readStream = fs.createReadStream(filePath);
  const writeStream = fs.createWriteStream(path.join(config.get('filesRoot'), fileName));
  let type;
  let size;

  await new Promise ((res) => {

    readStream
    .pipe(writeStream);

    writeStream
    .on('close', async ()=> {
      type =  fileType || mime.lookup(path.join(config.get('filesRoot'), fileName));
      size =  getFilesizeInBytes(path.join(config.get('filesRoot'), fileName));
      return res();
    })

  })
  .then(async res => {
    file = new File({
      fileName: fileName,
      mime: type,
      size: size
    });

    file = await file.save()
    .then(file => {
      ctxBody = 'File successfully uploaded';
      ctxStatus = 200;
      fileMime = file.mime;
    })
    .catch(err => {

      if(err.name == 'ValidationError') {
        console.error('ERROR: '+ err.errors.fileName.message);

      } else {
        console.error(err)
      };
    });


  })
  .catch(err => {

    if(err.name == 'ValidationError') {
      console.error('ERROR: '+ err.errors.fileName.message);

    } else {
      console.error(err)
    };
  });
    return {ctxBody, ctxStatus, fileMime};
}
