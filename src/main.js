import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';

import mappingRouterToController from './app/utils/mappingRouterToController.js';
import config from './config.js';

const app = new Koa();

app
.use(bodyParser())
.use(mappingRouterToController(__dirname))
.use(serve(__dirname + '/swagger/'))
.listen(config.port, () => {
    console.log(`Server started and listen on port ${config.port}`);
});