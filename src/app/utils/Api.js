const fs = require('fs'),
    router = require('koa-router')(),

    API_TYPE = Symbol('API_TYPE'),
    API_ROUTE = Symbol('API_ROUTE'),

    API_TYPE_GET = 'get',
    API_TYPE_POST = 'post',
    API_TYPE_PUT = 'put',
    API_TYPE_DELETE = 'delete';

function decorator(apiType, apiRoute, controller) {

    controller[API_TYPE] = apiType;
    controller[API_ROUTE] = apiRoute;

    return controller;

}

function addMapping(router, controllers) {

    if (!controllers) {
        return;
    }

    for (let key in controllers) {

        const controller = controllers[key];

        console.log(`register URL mapping: ${controller[API_TYPE].toUpperCase()} ${controller[API_ROUTE]}`);

        router[controller[API_TYPE]](controller[API_ROUTE], controller);

    }

}

function addControllers(router, dir) {
    fs.readdirSync(__dirname + '/' + dir).forEach(f => {
        console.log(`process controller: ${f}...`);
        addMapping(router, require(__dirname + '/' + dir + '/' + f));
    });
}

function router2controller(dir = '../controller') {
    addControllers(router, dir);
    return router.routes();
};

module.exports = {

    API_TYPE,
    API_ROUTE,

    API_TYPE_GET,
    API_TYPE_POST,
    API_TYPE_PUT,
    API_TYPE_DELETE,

    decorator,

    router2controller

};