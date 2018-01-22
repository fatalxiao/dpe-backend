import SensoryBlock from '../model/SensoryBlockModel.js';

async function getSensoryBlocks() {
    return await SensoryBlock.findAll();
}

export default {
    getSensoryBlocks
};