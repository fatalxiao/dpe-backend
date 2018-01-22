import _ from 'lodash';
import Router from 'koa-router';

const

    API_METHOD = Symbol('API_METHOD'),
    API_ROUTE = Symbol('API_ROUTE'),

    router = Router();

function addMapping(router, controllers) {

    if (!controllers) {
        return;
    }

    for (let key in controllers) {

        const controller = controllers[key],
            methods = Object.getOwnPropertyNames(controller);

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

}

function mappingRouterToController(controllers) {
    addMapping(router, controllers);
    return router.routes();
};

const request = (method, path) => (target, name, descriptor) => {
    descriptor.value[API_METHOD] = method;
    descriptor.value[API_ROUTE] = path;
    return descriptor;
};

export {
    request,
    mappingRouterToController
};