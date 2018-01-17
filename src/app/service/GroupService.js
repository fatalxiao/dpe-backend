const GroupDao = require('../dao/GroupDao.js'),
    Response = require('../utils/Response.js');

async function getGroups() {
    const group = await GroupDao.getGroups();
    return Response.success(group);
};

module.exports = {
    getGroups
};