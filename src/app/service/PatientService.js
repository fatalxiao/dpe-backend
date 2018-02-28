import PatientDao from '../dao/PatientDao.js';
import Response from '../utils/Response.js';
import Data from '../utils/Data.js';

async function getPatients() {
    return Response.buildSuccess(await PatientDao.getPatients());
};

async function createPatientInformation(data) {

    if (await PatientDao.isPatientInfomationExist(data.id)) {
        return Response.buildError(`Patient ID ${data.id} is exist.`);
    }

    Data.verify(data, ['id', 'groupId']);
    return Response.buildSuccess(await PatientDao.createPatientInfomation(data));

};

async function updatePatientInformation(data) {

    if (!(await PatientDao.isPatientInfomationExist(data.id))) {
        return Response.buildError(`Patient ID ${data.id} is not exist.`);
    }

    Data.verify(data, ['id', 'groupId']);
    return Response.buildSuccess(await PatientDao.updatePatientInfomation(data));

};

// async function addAnalgesiaData(data) {
//     Data.verify(data, ['patientId', 'timePoint']);
//     data.forEach(item => {
//         delete item.id;
//     });
//     return Response.buildSuccess(await PatientDao.createOrUpdateAnalgesiaData(data));
// };
//
// async function addObservalData(data) {
//     Data.verify(data, ['patientId']);
//     delete data.id;
//     return Response.buildSuccess(await PatientDao.createOrUpdateObservalData(data));
// };

export default {
    getPatients,
    createPatientInformation,
    updatePatientInformation
    // addPatient
};