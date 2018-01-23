import GroupService from '../service/GroupService.js';
import {Api, GetMapping, ApiOperation, RequestBody} from '../utils/ApiDecorator.js';

@Api({tags: 'Group'})
export default class GroupController {

    @GetMapping({value: '/dpe/group/getGroups'})
    @ApiOperation({value: 'get groups', notes: 'get all patient groups'})
    @RequestBody({value: 'dpe_group'})
    static async getGroups(ctx) {
        ctx.response.body = await GroupService.getGroups();
    }

};