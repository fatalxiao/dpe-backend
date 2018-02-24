import PatientDao from '../dao/PatientDao.js';
import Response from '../utils/Response.js';
import Data from '../utils/Data.js';

async function getPatients() {
    return Response.buildSuccess(await PatientDao.getPatients());
};

async function addPatient(requestData) {

    await addPatientInfomation({id: requestData.id, ...requestData.patient});
    await addAnalgesiaData(requestData.analgesia.map(item => ({patientId: requestData.id, ...item})));
    await addObservalData({patientId: requestData.id, ...requestData.observal});

    return Response.buildSuccess({});

};

async function addPatientInfomation(data) {
    // Data.verify(data, ['id', 'groupId']);
    return Response.buildSuccess(await PatientDao.addPatientInfomation(data));
};

async function addAnalgesiaData(data) {
    return Response.buildSuccess(await PatientDao.addAnalgesiaData(data));
};

async function addObservalData(data) {
    return Response.buildSuccess(await PatientDao.addObservalData(data));
};

export default {
    getPatients,
    addPatient
};