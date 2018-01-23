import _ from 'lodash';
import fs from 'fs';
import Router from 'koa-router';
import config from '../../config';
import {REQUEST_TAGS, REQUEST_METHOD, REQUEST_ROUTE} from './ApiDecorator';

const router = Router(),
    swaggerConfig = _.cloneDeep(config.swaggerConfig);

function mappingMethod(controller, methodName) {

    const method = controller[methodName],
        requestMethod = method[REQUEST_METHOD],
        requestRoute = method[REQUEST_ROUTE];

    // add swagger paths
    if (!(requestRoute in swaggerConfig.paths)) {
        swaggerConfig.paths[requestRoute] = {};
    }
    swaggerConfig.paths[requestRoute][requestMethod] = {
        tags: [controller[REQUEST_TAGS]],
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json'
        ]
    };

    // add mapping route
    console.log(`register URL mapping: ${requestMethod.toUpperCase()} ${requestRoute}`);
    router[requestMethod](requestRoute, controller[methodName]);

}

function mappingController(controller) {

    if (!controller) {
        return;
    }

    // add swagger tags
    if (controller[REQUEST_TAGS]) {
        swaggerConfig.tags.push({
            name: controller[REQUEST_TAGS]
        });
    }

    // traversal all rest class methods
    for (let methodName of Object.getOwnPropertyNames(controller)) {

        if (!methodName || !controller[methodName]
            || !controller[methodName][REQUEST_METHOD]
            || !controller[methodName][REQUEST_ROUTE]) {
            continue;
        }

        mappingMethod(controller, methodName);

    }

}

function mappingRouterToController(dir) {

    // traversal all controll file
    fs.readdirSync(dir).forEach(file => {
        console.log(`process controller: ${file}`);
        mappingController(require(dir + '/' + file).default);
    });

    console.log(JSON.stringify(swaggerConfig));

    return router.routes();

};

export default mappingRouterToController;