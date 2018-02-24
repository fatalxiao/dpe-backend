import SensoryBlockService from '../service/SensoryBlockService.js';
import {Api, ApiOperation, GetMapping} from '../utils/ApiDecorator';

@Api({tags: 'SensoryBlock'})
class SensoryBlockController {

    @GetMapping({value: '/dpe/sensoryBlock/getSensoryBlocks'})
    @ApiOperation({value: 'get sensory blocks', notes: 'get all sensory blocks'})
    static async getSensoryBlocks(ctx) {
        ctx.response.body = await SensoryBlockService.getSensoryBlocks();
    }

};

export default SensoryBlockController;