import SensoryBlockService from '../service/SensoryBlockService.js';
import Api from '../utils/Api.js';

const getSensoryBlocks = Api.decorator(Api.API_TYPE_GET, '/dpe/sensoryBlock/getSensoryBlocks', async ctx => {
    ctx.response.body = await SensoryBlockService.getSensoryBlocks();
});

export default {
    getSensoryBlocks
};