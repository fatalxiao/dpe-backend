import GroupService from '../service/GroupService.js';
import {RequestMethod, requestMapping} from '../utils/ApiDecorator.js';

export default class GroupController {

    @requestMapping({method: RequestMethod.GET, route: '/dpe/group/getGroups'})
    static async getGroups(ctx) {
        ctx.response.body = await GroupService.getGroups();
    }

};