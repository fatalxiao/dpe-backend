import SensoryBlockService from '../service/SensoryBlockService.js';
import {RequestMethod, RequestMapping} from '../utils/ApiDecorator';

export default class SensoryBlockController {

    @RequestMapping({method: RequestMethod.GET, route: '/dpe/sensoryBlock/getSensoryBlocks'})
    static async getSensoryBlocks(ctx) {
        ctx.response.body = await SensoryBlockService.getSensoryBlocks();
    }

};