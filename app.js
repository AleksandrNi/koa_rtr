const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

// const sendFile = require('./routes/workers/sendFile');
// const receiveFile = require('./routes/workers/receiveFile');
// const removeFile = require('./routes/workers/removeFile');



require('./handlers/01-favicon').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-logger').init(app);
require('./handlers/04-templates').init(app);
require('./handlers/05-errors').init(app);
require('./handlers/06-session').init(app);
require('./handlers/077-koabody').init(app);
/*require('./handlers/07-bodyParser').init(app);*/



router.get('/', require('./routes/frontpage').get);
router.get('/:filename', require('./routes/frontpage').get_file, require('./routes/workers/mongo').func);
router.post('/:filename', require('./routes/frontpage').post_file, require('./routes/workers/mongo').func);
router.put('/:dir/:filename', require('./routes/frontpage').put, require('./routes/workers/mongo').func);
router.get('/:dir/:filename', require('./routes/frontpage').get_files_file, require('./routes/workers/mongo').func);
/*router.delete('/', require('./routes/frontpage').delete, require('./routes/workers/mongo').func);*/

app.use(router.routes());

module.exports = app;
