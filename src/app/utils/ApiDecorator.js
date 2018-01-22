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

        methods.filter(item => {
            if (!controller[item][API_METHOD] && !controller[item][API_ROUTE]) {
                return false;
            }
            return true;
        });

        // console.log(`register URL mapping: ${controller[API_TYPE].toUpperCase()} ${controller[API_ROUTE]}`);



        // router[controller[API_TYPE]](controller[API_ROUTE], controller);
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