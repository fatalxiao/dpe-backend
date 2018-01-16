const SensoryBlockDao = require('../dao/SensoryBlockDao.js');

async function getSensoryBlocks() {
    return await SensoryBlockDao.getSensoryBlocks();
};

module.exports = {
    getSensoryBlocks
};