const API_TYPE = Symbol('API_TYPE'),
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

module.exports = {

    API_TYPE,
    API_ROUTE,

    API_TYPE_GET,
    API_TYPE_POST,
    API_TYPE_PUT,
    API_TYPE_DELETE,

    decorator

};