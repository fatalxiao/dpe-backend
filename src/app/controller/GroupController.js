import GroupService from '../service/GroupService.js';
import Api from '../utils/Api.js';
import {request} from '../utils/ApiDecorator.js';

// const getGroups = Api.decorator(Api.API_TYPE_GET, '/dpe/group/getGroups', async ctx => {
//     ctx.response.body = await GroupService.getGroups();
// });

export default class GroupController {

    @request('GET', '/dpe/group/getGroups')
    static async getGroups(ctx) {
        ctx.response.body = await GroupService.getGroups();
    }

};