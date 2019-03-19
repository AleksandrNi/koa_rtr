const fs = require('fs');
// get filesize // doesn't work with os windows
module.exports =  function getFilesizeInBytes(filename) {
    let stats = fs.statSync(filename);
    let fileSizeInBytes = stats["size"]

    return fileSizeInBytes
};
