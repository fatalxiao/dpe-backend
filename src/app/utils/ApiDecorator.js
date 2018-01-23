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

    API_METHOD = Symbol('API_METHOD'),
    API_ROUTE = Symbol('API_ROUTE'),

    router = Router();

function addMapping(router, controller) {

    if (!controller) {
        return;
    }

    const methods = Object.getOwnPropertyNames(controller);

    _.pull(methods, 'name', 'constructor', 'length', 'prototype');

    methods.forEach(methodName => {

        const method = controller[methodName][API_METHOD],
            route = controller[methodName][API_ROUTE];

        if (!method || !route) {
            return;
        }

        router[method.toLowerCase()](route, controller[methodName]);

        console.log(`register URL mapping: ${method.toUpperCase()} ${route}`);

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
    descriptor.value[API_METHOD] = method;
    descriptor.value[API_ROUTE] = route;
    return descriptor;
};

export {

    RequestMethod,

    requestMapping,
    mappingRouterToController

};