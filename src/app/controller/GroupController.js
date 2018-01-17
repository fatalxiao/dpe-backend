const GroupService = require('../service/GroupService.js'),
    Response = require('../utils/Response.js');

async function getGroups(ctx, next) {
    const groups = await GroupService.getGroups();
    ctx.response.body = Response.success(groups);
};

module.exports = {
    'GET /dpe/group/getGroups': getGroups
};