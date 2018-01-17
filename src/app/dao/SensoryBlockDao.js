const SensoryBlock = require('../model/SensoryBlockModel');

async function getSensoryBlocks() {
    return await SensoryBlock.findAll();
}

module.exports = {
    getSensoryBlocks
};