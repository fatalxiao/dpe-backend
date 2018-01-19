const SensoryBlockService = require('../service/SensoryBlockService.js'),
    Api = require('../utils/Api');

const getSensoryBlocks = Api.decorator(Api.API_TYPE_GET, '/dpe/sensoryBlock/getSensoryBlocks', async (ctx, next) => {
    ctx.response.body = await SensoryBlockService.getSensoryBlocks();
});

module.exports = {
    getSensoryBlocks
};