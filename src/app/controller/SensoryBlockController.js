import SensoryBlockService from '../service/SensoryBlockService.js';
import {request} from '../utils/ApiDecorator';

export default class SensoryBlockController {

    @request('GET', '/dpe/sensoryBlock/getSensoryBlocks')
    static async getSensoryBlocks(ctx) {
        ctx.response.body = await SensoryBlockService.getSensoryBlocks();
    }

};