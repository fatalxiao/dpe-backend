const GroupService = require('../service/GroupService.js'),
    response = require('../utils/response.js');

async function getGroups(ctx, next) {
    const patients = await GroupService.getGroups();
    ctx.response.body = response.success(patients);
};

module.exports = {
    'GET /dpe/group/getGroups': getGroups
};