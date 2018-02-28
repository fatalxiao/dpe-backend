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
    let result;

    try {
        result = await PatientDao.createPatientInfomation(data);
    } catch (e) {
        return Response.buildError('Create Patient failure.');
    }

    return Response.buildSuccess(result);

};

async function updatePatientInformation(data) {

    if (!(await PatientDao.isPatientInfomationExist(data.id))) {
        return Response.buildError(`Patient ID ${data.id} is not exist.`);
    }

    Data.verify(data, ['id', 'groupId']);
    let result;

    try {
        result = await PatientDao.updatePatientInfomation(data);
    } catch (e) {
        return Response.buildError('Update Patient failure.');
    }

    return Response.buildSuccess(result);

};

async function createOrUpdatePatientInfomation(data) {

    Data.verify(data, ['id', 'groupId']);
    let result;

    try {
        result = await PatientDao.createOrUpdatePatientInfomation(data);
    } catch (e) {
        return Response.buildError('Update Patient failure.');
    }

    return Response.buildSuccess(result);

};

export default {

    getPatients,

    createPatientInformation,
    updatePatientInformation,
    createOrUpdatePatientInfomation

};