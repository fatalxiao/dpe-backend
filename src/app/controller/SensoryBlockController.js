import SensoryBlockService from '../service/SensoryBlockService.js';
import {GetMapping} from '../utils/ApiDecorator';

export default class SensoryBlockController {

    @GetMapping({route: '/dpe/sensoryBlock/getSensoryBlocks'})
    static async getSensoryBlocks(ctx) {
        ctx.response.body = await SensoryBlockService.getSensoryBlocks();
    }

};