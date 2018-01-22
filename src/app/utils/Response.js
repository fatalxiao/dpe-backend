const Mappings = {

    SUCCESS: [2000, 'success'],

    ERROR: [4000, 'error'],
    PARAM_INCORRECT: [4001, 'param incorrect']

};

function build([code, msg], data) {
    return JSON.stringify({
        code,
        msg,
        data
    });
}

function buildSuccess(data) {
    return build(Mappings.SUCCESS, data);
}

function buildError(data) {
    return build(Mappings.ERROR, data);
}

function buildParamError(data) {
    return build(Mappings.PARAM_INCORRECT, data);
}

export default {
    build,
    buildSuccess,
    buildError,
    buildParamError
};