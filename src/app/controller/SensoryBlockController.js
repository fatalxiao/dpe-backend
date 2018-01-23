import SensoryBlockService from '../service/SensoryBlockService.js';
import {RequestMethod, requestMapping} from '../utils/ApiDecorator';

export default class SensoryBlockController {

    @requestMapping({method: RequestMethod.GET, route: '/dpe/sensoryBlock/getSensoryBlocks'})
    static async getSensoryBlocks(ctx) {
        ctx.response.body = await SensoryBlockService.getSensoryBlocks();
    }

};