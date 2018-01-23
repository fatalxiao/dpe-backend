import _ from 'lodash';
import fs from 'fs';
import Router from 'koa-router';
import config from '../../config';
import {REQUEST_TAGS, REQUEST_METHOD, REQUEST_ROUTE} from './ApiDecorator';

const router = Router(),
    swaggerConfig = _.cloneDeep(config.swaggerConfig);

function addMapping(router, controller) {

    if (!controller) {
        return;
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
            route = method[REQUEST_ROUTE];

        if (!requestMethod || !route) {
            continue;
        }

        console.log(`register URL mapping: ${requestMethod.toUpperCase()} ${route}`);
        router[requestMethod](route, controller[methodName]);

    }

}

function mappingRouterToController(dir) {

    // traversal all controll file
    fs.readdirSync(dir).forEach(file => {

        console.log(`process controller: ${file}`);

        const controller = require(dir + '/' + file).default;

        // add swagger tags
        if (controller[REQUEST_TAGS]) {
            swaggerConfig.tags.push({
                name: controller[REQUEST_TAGS]
            });
        }

        addMapping(router, controller);

    });

    console.log(JSON.stringify(swaggerConfig));

    return router.routes();

};

export default mappingRouterToController;