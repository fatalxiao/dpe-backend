import GroupService from '../service/GroupService.js';
import {RequestMethod, RequestMapping} from '../utils/ApiDecorator.js';

export default class GroupController {

    @RequestMapping({method: RequestMethod.GET, route: '/dpe/group/getGroups'})
    static async getGroups(ctx) {
        ctx.response.body = await GroupService.getGroups();
    }

};