const SensoryBlockService = require('../service/SensoryBlockService.js'),
    Response = require('../utils/Response.js');

async function getSensoryBlocks(ctx, next) {
    ctx.response.body = await SensoryBlockService.getSensoryBlocks();
};

module.exports = {
    'GET /dpe/sensoryBlock/getSensoryBlocks': getSensoryBlocks
};