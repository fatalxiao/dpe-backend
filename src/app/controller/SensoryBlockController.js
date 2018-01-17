const SensoryBlockService = require('../service/SensoryBlockService.js'),
    Response = require('../utils/Response.js');

async function getSensoryBlocks(ctx, next) {
    const sensoryBlocks = await SensoryBlockService.getSensoryBlocks();
    ctx.response.body = Response.success(sensoryBlocks);
};

module.exports = {
    'GET /dpe/sensoryBlock/getSensoryBlocks': getSensoryBlocks
};