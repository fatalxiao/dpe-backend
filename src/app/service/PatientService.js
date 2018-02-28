import PatientDao from '../dao/PatientDao.js';
import Response from '../utils/Response.js';
import Data from '../utils/Data.js';

async function getPatients() {
    return Response.buildSuccess(await PatientDao.getPatients());
};

async function createPatient(data) {

    if (await PatientDao.isPatientExist(data.id)) {
        return Response.buildError(`Patient ID ${data.id} is exist.`);
    }

    Data.verify(data, ['id', 'groupId']);
    let result;

    try {
        result = await PatientDao.createPatient(data);
    } catch (e) {
        return Response.buildError('Create Patient failure.');
    }

    return Response.buildSuccess(result);

};

async function updatePatient(data) {

    if (!(await PatientDao.isPatientExist(data.id))) {
        return Response.buildError(`Patient ID ${data.id} is not exist.`);
    }

    Data.verify(data, ['id', 'groupId']);
    let result;

    try {
        result = await PatientDao.updatePatient(data);
    } catch (e) {
        return Response.buildError('Update Patient failure.');
    }

    return Response.buildSuccess(result);

};

async function createOrUpdatePatient(data) {

    Data.verify(data, ['id', 'groupId']);
    let result;

    try {
        result = await PatientDao.createOrUpdatePatient(data);
    } catch (e) {
        return Response.buildError('Update Patient failure.');
    }

    return Response.buildSuccess(result);

};

export default {

    getPatients,

    createPatient,
    updatePatient,
    createOrUpdatePatient

};