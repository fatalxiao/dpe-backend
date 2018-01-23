const

    REQUEST_TAGS = Symbol('REQUEST_TAGS'),
    REQUEST_METHOD = Symbol('REQUEST_METHOD'),
    REQUEST_ROUTE = Symbol('REQUEST_ROUTE'),
    REQUEST_SUMMARY = Symbol('REQUEST_SUMMARY'),
    REQUEST_DESCRIPTION = Symbol('REQUEST_DESCRIPTION'),
    REQUEST_PARAMETERS_PATH = Symbol('REQUEST_PARAMETERS_PATH'),
    REQUEST_PARAMETERS_PARAM = Symbol('REQUEST_PARAMETERS_PARAM'),
    REQUEST_PARAMETERS_BODY = Symbol('REQUEST_PARAMETERS_BODY'),

    RequestMethod = {
        GET: 'get',
        POST: 'post',
        PUT: 'put',
        DELETE: 'delete'
    };

const Api = ({tags}) => (target) => {
    target[REQUEST_TAGS] = tags;
    return target;
};

const RequestMapping = ({method, value}) => (target, name, descriptor) => {
    descriptor.value[REQUEST_METHOD] = method;
    descriptor.value[REQUEST_ROUTE] = value;
    return descriptor;
};

const GetMapping = ({value}) => (target, name, descriptor) => {
    descriptor.value[REQUEST_METHOD] = RequestMethod.GET;
    descriptor.value[REQUEST_ROUTE] = value;
    return descriptor;
};

const PostMapping = ({value}) => (target, name, descriptor) => {
    descriptor.value[REQUEST_METHOD] = RequestMethod.POST;
    descriptor.value[REQUEST_ROUTE] = value;
    return descriptor;
};

const PutMapping = ({value}) => (target, name, descriptor) => {
    descriptor.value[REQUEST_METHOD] = RequestMethod.PUT;
    descriptor.value[REQUEST_ROUTE] = value;
    return descriptor;
};

const DeleteMapping = ({value}) => (target, name, descriptor) => {
    descriptor.value[REQUEST_METHOD] = RequestMethod.DELETE;
    descriptor.value[REQUEST_ROUTE] = value;
    return descriptor;
};

const ApiOperation = ({value, notes}) => (target, name, descriptor) => {
    descriptor.value[REQUEST_SUMMARY] = value;
    descriptor.value[REQUEST_DESCRIPTION] = notes;
    return descriptor;
};

const PathVariable = ({value, notes, required}) => (target, name, descriptor) => {

    const param = {
        value,
        notes,
        required
    };

    if (REQUEST_PARAMETERS_PATH in descriptor.value) {
        descriptor.value[REQUEST_PARAMETERS_PATH].push(param);
    } else {
        descriptor.value[REQUEST_PARAMETERS_PATH] = [param];
    }

    return descriptor;

};

const ApiParam = ({value, type, notes, required}) => (target, name, descriptor) => {

    const param = {
        value,
        type,
        notes,
        required
    };

    if (REQUEST_PARAMETERS_PARAM in descriptor.value) {
        descriptor.value[REQUEST_PARAMETERS_PARAM].push(param);
    } else {
        descriptor.value[REQUEST_PARAMETERS_PARAM] = [param];
    }

    return descriptor;

};

const RequestBody = ({value, notes, required}) => (target, name, descriptor) => {

    const param = {
        value,
        notes,
        required
    };

    if (REQUEST_PARAMETERS_BODY in descriptor.value) {
        descriptor.value[REQUEST_PARAMETERS_BODY].push(param);
    } else {
        descriptor.value[REQUEST_PARAMETERS_BODY] = [param];
    }

    return descriptor;

};

export {

    REQUEST_TAGS,
    REQUEST_METHOD,
    REQUEST_ROUTE,
    REQUEST_SUMMARY,
    REQUEST_DESCRIPTION,
    REQUEST_PARAMETERS_PATH,
    REQUEST_PARAMETERS_PARAM,
    REQUEST_PARAMETERS_BODY,

    RequestMethod,

    Api,
    RequestMapping,
    GetMapping,
    PostMapping,
    PutMapping,
    DeleteMapping,
    ApiOperation,
    PathVariable,
    ApiParam,
    RequestBody

};