import PatientDao from '../dao/PatientDao.js';
import Response from '../utils/Response.js';
import Data from '../utils/Data.js';

async function createAnalgesiaData(data) {
    Data.verify(data, ['patientId', 'timePoint']);
    data.forEach(item => {
        delete item.id;
    });
    return Response.buildSuccess(await PatientDao.createOrUpdateAnalgesiaData(data));
};

async function updateAnalgesiaData(data) {

    Data.verify(data, ['patientId', 'timePoint']);
    data.forEach(item => {
        delete item.id;
    });

    return Response.buildSuccess(await PatientDao.createOrUpdateAnalgesiaData(data));

};

export default {
    createAnalgesiaData,
    updateAnalgesiaData
};