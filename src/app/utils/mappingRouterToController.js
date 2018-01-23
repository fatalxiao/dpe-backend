import _ from 'lodash';
import fs from 'fs';
import Router from 'koa-router';
import config from '../../config';
import {REQUEST_TAGS, REQUEST_METHOD, REQUEST_ROUTE} from './ApiDecorator';

const router = Router(),
    swaggerConfig = _.cloneDeep(config.swaggerConfig);

function mappingMethod(controller, methodName, requestMethod, requestRoute) {
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

        if (!methodName) {
            continue;
        }

        const method = controller[methodName];

        if (!method) {
            continue;
        }

        const requestMethod = method[REQUEST_METHOD],
            requestRoute = method[REQUEST_ROUTE];

        if (!requestMethod || !requestRoute) {
            continue;
        }

        mappingMethod(controller, methodName, requestMethod, requestRoute);

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