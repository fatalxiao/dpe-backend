import PatientDao from '../dao/PatientDao.js';

import Response from '../utils/Response.js';
import AC from '../utils/AnalgesiaCalculation.js';

async function getPatients() {
    return Response.buildSuccess(await PatientDao.getPatients());
};

async function getFullPatients() {
    return Response.buildSuccess(await PatientDao.getFullPatients());
};

async function exportPatients() {

    const data = await PatientDao.getFullPatients();

    data.map(item => {

        const analgesiaData = AC.fullFillAnalgesiaData(item.analgesia);

        return {
            group: item.group ? item.group.name : '',
            name: item.name || '',
            id: item.id || '',
            age: item.age || '',
            height: item.height || '',
            weight: item.weight || '',
            bmi: (item.weight / ((item.height / 100) ** 2)) || '',
            gestationalDays: item.gestationalDays || '',
            initialVasScore: item.initialVasScore || '',
            cervicalDilationAtTimeOfEA: item.cervicalDilationAtTimeOfEA || '',
            systolicBloodPressure: item.systolicBloodPressure || '',
            diastolicBloodPressure: item.diastolicBloodPressure || '',
            heartRate: item.heartRate || '',
            pulseOxygenSaturation: item.pulseOxygenSaturation || '',
            fetalHeartRate: item.fetalHeartRate || '',
            hasOxytocinAtTimeOfEA: item.hasOxytocinAtTimeOfEA ? 1 : 0,
            isVasLessThan1In20: AC.isVasLessThan1(analgesiaData, 20),
            isVasLessThan1In30: AC.isVasLessThan1(analgesiaData, 30),
            timePointOfVasLessThan1: AC.timePointOfVasLessThan1(analgesiaData),
            isS1In20Left: AC.isS1In20(analgesiaData, 20, AC.Position.LEFT),
            isS1In20Right: AC.isS1In20(analgesiaData, 20, AC.Position.RIGHT)
        };

    });

    return data;

};

async function getPatientById(id) {
    return Response.buildSuccess(await PatientDao.getPatientById(id));
};

async function createPatient(data) {

    if (await PatientDao.isPatientExist(data.id)) {
        return Response.buildError(`Patient ID ${data.id} is exist.`);
    }

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

    let result;

    try {
        result = await PatientDao.updatePatient(data);
    } catch (e) {
        return Response.buildError('Update Patient failure.');
    }

    return Response.buildSuccess(result);

};

async function createOrUpdatePatient(data) {

    let result;

    try {
        result = await PatientDao.createOrUpdatePatient(data);
    } catch (e) {
        return Response.buildError('Update Patient failure.');
    }

    return Response.buildSuccess(result);

};

async function enablePatient(id) {

    if (!(await PatientDao.isPatientExist(id))) {
        return Response.buildError(`Patient ID ${id} is not exist.`);
    }

    let result;

    try {
        result = await PatientDao.enablePatient(id);
    } catch (e) {
        return Response.buildError('Enable Patient failure.');
    }

    return Response.buildSuccess(result);

};

async function disablePatient(id) {

    if (!(await PatientDao.isPatientExist(id))) {
        return Response.buildError(`Patient ID ${id} is not exist.`);
    }

    let result;

    try {
        result = await PatientDao.disablePatient(id);
    } catch (e) {
        return Response.buildError('Enable Patient failure.');
    }

    return Response.buildSuccess(result);

};

export default {

    getPatients,
    getFullPatients,
    exportPatients,

    getPatientById,

    createPatient,
    updatePatient,
    createOrUpdatePatient,

    enablePatient,
    disablePatient

};