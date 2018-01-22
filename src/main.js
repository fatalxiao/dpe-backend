import Koa from 'koa';
import Api from 'app/utils/Api.js';
import bodyParser from 'koa-bodyparser';
import config from 'config.js';

const app = new Koa();

app.use(bodyParser());
app.use(Api.router2controller());

app.listen(config.port);
console.log(`Server started and listen on port ${config.port}`);