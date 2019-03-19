const path = require('path');
const config = require('config');
const File = require('../../models/File');
const streamFileUpload = require(path.join(config.get('workersRoot'), 'streamFileUpload.js'));


module.exports = async function methodPost (fileName, filePath, fileType, ctxBody, ctxStatus, fileMime) {

  let file = await File.findOne({fileName: fileName});


  if  (!file) {

    _ = await streamFileUpload(fileName, filePath, fileType, ctxBody, ctxStatus);
    ctxBody = _.ctxBody;
    ctxStatus = _.ctxStatus;
    fileMime = _.fileMime;

  } else {

    ctxBody = 'File with the same name exists';
    ctxStatus = 403;
    fileMime = file.mime;
    console.error('File with the same name exists');
  }


  fileMime = fileMime ;
  return {ctxBody, ctxStatus, fileMime};
}
