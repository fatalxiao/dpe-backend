import SensoryBlockDao from '../dao/SensoryBlockDao.js';
import Response from '../utils/Response.js';

async function getSensoryBlocks() {
    return Response.buildSuccess(await SensoryBlockDao.getSensoryBlocks());
};

export default {
    getSensoryBlocks
};