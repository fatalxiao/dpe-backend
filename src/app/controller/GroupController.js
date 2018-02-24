import GroupService from '../service/GroupService.js';
import {Api, GetMapping, ApiOperation} from '../utils/ApiDecorator.js';

@Api({tags: 'Group'})
class GroupController {

    @GetMapping({value: '/dpe/group/getGroups'})
    @ApiOperation({value: 'get groups', notes: 'get all patient groups'})
    static async getGroups(ctx) {
        ctx.response.body = await GroupService.getGroups();
    }

};

export default GroupController;