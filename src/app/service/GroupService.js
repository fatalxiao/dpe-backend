const GroupDao = require('../dao/GroupDao.js'),
    Response = require('../utils/Response.js');

async function getGroups() {
    return Response.buildSuccess(await GroupDao.getGroups());
};

module.exports = {
    getGroups
};