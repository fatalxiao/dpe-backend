const GroupDao = require('../dao/GroupDao.js');

async function getGroups() {

    const result = await GroupDao.getGroups();

    return result;

};

module.exports = {
    getGroups
};