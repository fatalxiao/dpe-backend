import PatientDao from '../dao/PatientDao.js';
import Response from '../utils/Response.js';

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

    formData.age = formData.age || null;
    formData.gestationalDays = formData.gestationalDays || null;
    formData.height = formData.height || null;
    formData.weight = formData.weight || null;
    formData.heartRate = formData.heartRate || null;
    formData.initialVasScore = formData.initialVasScore || null;
    formData.cervicalDilationAtTimeOfEA = formData.cervicalDilationAtTimeOfEA || null;
    formData.systolicBloodPressure = formData.systolicBloodPressure || null;
    formData.diastolicBloodPressure = formData.diastolicBloodPressure || null;
    formData.foetalHeartRate = formData.foetalHeartRate || null;

    return Response.buildSuccess(await PatientDao.addPatientInfomation(formData));

};

async function addAnalgesiaData(arrayData) {
    return Response.buildSuccess(await PatientDao.addPatientInfomation(arrayData));
};

async function addObservalData(arrayData) {
    return Response.buildSuccess(await PatientDao.addPatientInfomation(arrayData));
};

export default {
    getPatients,
    addPatient
};