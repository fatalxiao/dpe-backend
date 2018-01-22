const GroupService = require('../service/GroupService.js'),
    Api = require('../utils/Api');

const getGroups = Api.decorator(Api.API_TYPE_GET, '/dpe/group/getGroups', async ctx => {
    ctx.response.body = await GroupService.getGroups();
});

module.exports = {
    getGroups
};