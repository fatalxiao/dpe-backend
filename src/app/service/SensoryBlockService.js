const SensoryBlockDao = require('../dao/SensoryBlockDao.js');

async function getSensoryBlocks() {

    const result = await SensoryBlockDao.getSensoryBlocks();

    return result;

};

module.exports = {
    getSensoryBlocks
};