const Koa = require('koa'),
    bodyParser = require('koa-bodyparser'),

    router2controller = require('./utils/router2controller.js'),
    config = require('./config.js'),

    app = new Koa();

app.use(bodyParser());
app.use(router2controller());

app.listen(config.port);
console.log(`Server started and listen on port ${config.port}`);