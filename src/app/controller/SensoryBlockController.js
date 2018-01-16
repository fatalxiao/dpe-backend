const SensoryBlockService = require('../service/SensoryBlockService.js'),
    response = require('../utils/response.js');

async function getSensoryBlocks(ctx, next) {
    const sensoryBlocks = await SensoryBlockService.getSensoryBlocks();
    ctx.response.body = response.success(sensoryBlocks);
};

module.exports = {
    'GET /dpe/sensoryBlock/getSensoryBlocks': getSensoryBlocks
};