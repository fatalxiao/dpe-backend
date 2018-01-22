import GroupDao from '../dao/GroupDao.js';
import Response from '../utils/Response.js';

async function getGroups() {
    return Response.buildSuccess(await GroupDao.getGroups());
};

export default {
    getGroups
};