import GroupService from '../service/GroupService.js';
import Api from '../utils/Api.js';

const getGroups = Api.decorator(Api.API_TYPE_GET, '/dpe/group/getGroups', async ctx => {
    ctx.response.body = await GroupService.getGroups();
});

export default {
    getGroups
};