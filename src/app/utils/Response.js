function success(data) {
    return JSON.stringify({
        code: 2000,
        msg: 'success',
        data
    });
}

function failure(data) {
    return JSON.stringify({
        code: 4000,
        msg: 'failure',
        data
    });
}

module.exports = {
    success,
    failure
};