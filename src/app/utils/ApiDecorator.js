import _ from 'lodash';
import fs from 'fs';
import Router from 'koa-router';

const

    RequestMethod = {
        GET: 'get',
        POST: 'post',
        PUT: 'put',
        DELETE: 'delete'
    },

    REQUEST_METHOD = Symbol('REQUEST_METHOD'),
    REQUEST_ROUTE = Symbol('REQUEST_ROUTE'),

    router = Router();

function addMapping(router, controller) {

    if (!controller) {
        return;
    }

    const methods = Object.getOwnPropertyNames(controller);

    _.pull(methods, 'name', 'constructor', 'length', 'prototype');

    methods.forEach(methodName => {

        const requestMethod = controller[methodName][REQUEST_METHOD],
            route = controller[methodName][REQUEST_ROUTE];

        if (!requestMethod || !route) {
            return;
        }

        router[requestMethod](route, controller[methodName]);

        console.log(`register URL mapping: ${requestMethod.toUpperCase()} ${route}`);

    });

}

function mappingRouterToController(dir) {

    fs.readdirSync(dir).forEach(file => {
        console.log(`process controller: ${file}`);
        addMapping(router, require(dir + '/' + file).default);
    });

    return router.routes();

};

const requestMapping = ({method, route}) => (target, name, descriptor) => {
    descriptor.value[REQUEST_METHOD] = method;
    descriptor.value[REQUEST_ROUTE] = route;
    return descriptor;
};

export {

    RequestMethod,

    requestMapping,
    mappingRouterToController

};