module.exports = {
    success(data) {
        return JSON.stringify({
            code: 2000,
            msg: 'success',
            data
        });
    },
    failure(data) {
        return JSON.stringify({
            code: 4000,
            msg: 'failure',
            data
        });
    }
};