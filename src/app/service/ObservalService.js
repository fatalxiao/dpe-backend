import PatientDao from '../dao/PatientDao.js';
import Response from '../utils/Response.js';
import Data from '../utils/Data.js';

async function addObservalData(data) {
    Data.verify(data, ['patientId']);
    delete data.id;
    return Response.buildSuccess(await PatientDao.createOrUpdateObservalData(data));
};

export default {
    getPatients,
    createPatientInformation,
    updatePatientInformation
    // addPatient
};