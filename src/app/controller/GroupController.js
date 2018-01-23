import GroupService from '../service/GroupService.js';
import {Api, GetMapping, ApiOperation} from '../utils/ApiDecorator.js';

@Api({tags: 'Group'})
export default class GroupController {

    @GetMapping({value: '/dpe/group/getGroups'})
    @ApiOperation({value: 'get accounts', notes: 'get accounts on TripAdivisor'})
    static async getGroups(ctx) {
        ctx.response.body = await GroupService.getGroups();
    }

};