const bodyParser = require('koa-bodyparser');

// ctx.request.body = {name: '', password: '', ...}

exports.init = app => app.use(bodyParser({
  formidable:{uploadDir: './uploads'},    //This is where the files would come
  multipart: true,
  urlencoded: true,
  jsonLimit: '56kb'
}));
