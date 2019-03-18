const pug = require('pug');
const path = require('path');
const config = require('config');

exports.init = app => app.use(async (ctx, next) => {

  ctx.render = function(templatePath) {
    return pug.renderFile(
      path.join(config.get('templatesRoot'), templatePath));
  };

  await next();
});
