const GroupDao = require('../dao/GroupDao.js');

async function getGroups() {
    return await GroupDao.getGroups();
};

module.exports = {
    getGroups
};