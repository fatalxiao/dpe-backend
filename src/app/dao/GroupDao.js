import Group from '../model/GroupModel.js';

async function getGroups() {
    return await Group.findAll();
}

export default {
    getGroups
};