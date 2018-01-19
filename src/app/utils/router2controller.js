const fs = require('fs'),
    router = require('koa-router')(),
    Api = require('./Api');

function addMapping(router, controllers) {

    if (!controllers) {
        return;
    }

    for (let key in controllers) {

        const controller = controllers[key];

        console.log(`register URL mapping: ${controller[Api.API_TYPE].toUpperCase()} ${controller[Api.API_ROUTE]}`);

        router[controller[Api.API_TYPE]](controller[Api.API_ROUTE], controller);

    }

}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).forEach(f => {
        console.log(`process controller: ${f}...`);
        addMapping(router, require(__dirname + '/' + dir + '/' + f));
    });
}

module.exports = function (dir = '../controller') {
    addControllers(router, dir);
    return router.routes();
};