const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),

    Api = require('./app/utils/Api.js'),
    config = require('./config.js'),

    app = new Koa();

app.use(bodyParser());
app.use(Api.router2controller());

app.listen(config.port);
console.log(`Server started and listen on port ${config.port}`);