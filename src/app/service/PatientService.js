import PatientDao from '../dao/PatientDao.js';
import Response from '../utils/Response.js';
import Data from '../utils/Data.js';

async function getPatients() {
    return Response.buildSuccess(await PatientDao.getPatients());
};

async function addPatient(requestData) {

    await addPatientInfomation({id: requestData.id, ...requestData.patient});
    await addAnalgesiaData(requestData.analgesia.map(item => ({id: requestData.id, ...item})));
    await addObservalData({id: requestData.id, ...requestData.observal});

    return Response.buildSuccess({});

};

async function addPatientInfomation(formData) {
    // Data.verify(formData, ['id', 'groupId']);
    return Response.buildSuccess(await PatientDao.addPatientInfomation(formData));
};

async function addAnalgesiaData(arrayData) {
    return Response.buildSuccess(await PatientDao.addAnalgesiaData(arrayData));
};

async function addObservalData(formData) {
    Data.verify(formData);
    return Response.buildSuccess(await PatientDao.addObservalData(formData));
};

export default {
    getPatients,
    addPatient
};