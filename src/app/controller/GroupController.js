import GroupService from '../service/GroupService.js';
import {request} from '../utils/ApiDecorator.js';

export default class GroupController {

    @request('GET', '/dpe/group/getGroups')
    static async getGroups(ctx) {
        ctx.response.body = await GroupService.getGroups();
    }

};