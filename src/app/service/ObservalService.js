import ObservalDao from '../dao/ObservalDao.js';
import Response from '../utils/Response.js';
import Data from '../utils/Data.js';

async function createObservalData(data) {

    if (await ObservalDao.isObservalDataExist(data.patientData)) {
        return Response.buildError(`Patient ID ${data.patientData} Observal Data is exist.`);
    }

    Data.verify(data.observalData, ['id', 'groupId']);
    let result;

    try {
        result = await PatientDao.createPatientInfomation(data);
    } catch (e) {
        return Response.buildError('Create Patient failure.');
    }

    return Response.buildSuccess(result);

};

export default {
    getPatients,
    createPatientInformation,
    updatePatientInformation
    // addPatient
};