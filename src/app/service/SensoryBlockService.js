const SensoryBlockDao = require('../dao/SensoryBlockDao.js'),
    Response = require('../utils/Response.js');

async function getSensoryBlocks() {
    return Response.buildSuccess(await SensoryBlockDao.getSensoryBlocks());
};

module.exports = {
    getSensoryBlocks
};