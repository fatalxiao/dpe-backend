import _ from 'lodash';
import fs from 'fs';
import Router from 'koa-router';
import config from '../../config';
import {
    REQUEST_TAGS, REQUEST_METHOD, REQUEST_ROUTE, REQUEST_SUMMARY, REQUEST_DESCRIPTION,
    REQUEST_PARAMETERS_PATH, REQUEST_PARAMETERS_PARAM, REQUEST_PARAMETERS_BODY
} from './ApiDecorator';

const router = Router(),
    swaggerConfig = _.cloneDeep(config.swaggerConfig);

function mappingPaths(controller, method, requestMethod, requestRoute) {

    if (!(requestRoute in swaggerConfig.paths)) {
        swaggerConfig.paths[requestRoute] = {};
    }

    const config = {
        tags: [controller[REQUEST_TAGS]],
        summary: method[REQUEST_SUMMARY],
        description: method[REQUEST_DESCRIPTION],
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json'
        ],
        parameters: []
    };

    // add PathVariable
    if (REQUEST_PARAMETERS_PATH in method) {
        for (let item of method[REQUEST_PARAMETERS_PATH]) {
            config.parameters.push({
                name: item.value,
                in: 'query',
                description: item.notes,
                required: item.required
            });
        }
    }

    // add ApiParam
    if (REQUEST_PARAMETERS_PARAM in method) {
        for (let item of method[REQUEST_PARAMETERS_PARAM]) {
            config.parameters.push({
                name: item.value,
                in: 'body',
                description: item.notes,
                required: item.required,
                type: param.type
            });
        }
    }

    // add RequestBody
    if (REQUEST_PARAMETERS_BODY in method) {
        for (let item of method[REQUEST_PARAMETERS_BODY]) {
            config.parameters.push({
                in: 'body',
                name: 'body',
                description: item.notes,
                required: item.required,
                schema: {
                    $ref: `#/definitions/${item.value}`
                }
            });
        }
    }

    swaggerConfig.paths[requestRoute][requestMethod] = config;

}

function mappingMethod(controller, method) {

    const requestMethod = method[REQUEST_METHOD],
        requestRoute = method[REQUEST_ROUTE];

    mappingPaths(controller, method, requestMethod, requestRoute);

    // add mapping route
    // console.log(`register URL mapping: ${requestMethod.toUpperCase()} ${requestRoute}`);
    router[requestMethod](requestRoute, method);

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

        mappingMethod(controller, controller[methodName]);

    }

}

function parseModelType(type) {

    const typeStr = type.toString().toLowerCase();

    if (typeStr === 'tinyint(1)') {
        return 'boolean';
    } else if (/^varchar\(\d+\)$/.test(typeStr)) {
        return 'string';
    } else if (/^integer\(\d+\)$/.test(typeStr)) {
        return 'integer';
    }

    return typeStr;

}

function mappingModel(model) {

    if (!model) {
        return;
    }

    if (!(model.name in swaggerConfig.definitions)) {
        swaggerConfig.definitions[model.name] = {
            type: 'object',
            properties: {},
            xml: {
                'name': model.name
            }
        };
    }

    const properties = swaggerConfig.definitions[model.name].properties;

    for (let attributeName in model.attributes) {

        const attribute = model.attributes[attributeName];

        properties[attribute.fieldName] = {
            type: parseModelType(attribute.type)
        };

    }

}

function mappingRouterToController(dir) {

    // traversal all controll file
    fs.readdirSync(dir + '/app/controller').forEach(file => {
        // console.log(`process controller: ${file}`);
        mappingController(require(dir + '/app/controller/' + file).default);
    });

    // traversal all model file
    fs.readdirSync(dir + '/app/model').forEach(file => {
        mappingModel(require(dir + '/app/model/' + file).default);
    });

    fs.writeFileSync(dir + '/swagger/swagger.json', JSON.stringify(swaggerConfig));

    return router.routes();

};

export default mappingRouterToController;