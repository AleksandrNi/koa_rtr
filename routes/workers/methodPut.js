const fs = require('fs');
const path = require('path');
const config = require('config');
const File = require('../../models/File');
const streamFileUpload = require(path.join(config.get('workersRoot'), 'streamFileUpload.js'));


module.exports = async function methodPut (fileName, filePath, fileType, ctxBody, ctxStatus) {
  let file = await File.findOne({fileName: fileName});

  if  (!file) {
    console.error('File with the same name doesnt exist')
    ctxStatus = 404;
    ctxBody = 'File with the same name doesnt exist';
    fileMime = 'null';

  } else {

    _ = await streamFileUpload(fileName, filePath, fileType, ctxBody, ctxStatus);

    fileMime = _.fileMime;


    fileIn = fs.createReadStream(path.join(config.get('filesRoot'), fileName));


    ctxStatus = 200;
    ctxBody = fileIn;

  }

  return {ctxBody, ctxStatus, fileMime };

}
