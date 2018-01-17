const GroupService = require('../service/GroupService.js');

async function getGroups(ctx, next) {
    ctx.response.body = await GroupService.getGroups();
};

module.exports = {
    'GET /dpe/group/getGroups': getGroups
};