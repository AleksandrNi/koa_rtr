const koaBody = require('koa-body');

exports.init = app => {
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: `${__dirname}/uploads`,
    keepExtensions: true,
  },
}));

}
