const Group = require('../model/GroupModel');

async function getGroups() {
    return await Group.findAll();
}

module.exports = {
    getGroups
};