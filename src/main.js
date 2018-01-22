import Koa from 'koa';
import {mappingRouterToController} from './app/utils/ApiDecorator.js';
import bodyParser from 'koa-bodyparser';
import config from './config.js';
import * as controllers from './app/controller';

const app = new Koa();

app.use(bodyParser()).use(mappingRouterToController(controllers));

app.listen(config.port);
console.log(`Server started and listen on port ${config.port}`);