import PatientDao from '../dao/PatientDao.js';
import SensoryBlockDao from '../dao/SensoryBlockDao.js';

import Response from '../utils/Response.js';
import AC from '../utils/AnalgesiaCalculation.js';

async function getPatients() {
    return Response.buildSuccess(await PatientDao.getPatients());
};

async function getFullPatients() {
    return Response.buildSuccess(await PatientDao.getFullPatients());
};

async function exportPatients() {

    const data = await PatientDao.getFullPatients(),
        sensoryBlocks = await SensoryBlockDao.getSensoryBlocks(),

        s1Value = sensoryBlocks.find(item => item.type === 2 && item.name === 'S1').value,
        s2Value = sensoryBlocks.find(item => item.type === 2 && item.name === 'S2').value,
        t8Value = sensoryBlocks.find(item => item.type === 1 && item.name === 'T8').value,
        t10Value = sensoryBlocks.find(item => item.type === 1 && item.name === 'T10').value;

    data.map(item => {

        const analgesiaData = AC.fullFillAnalgesiaData(item.analgesia),

            isS1In20Left = AC.isSacralSensoryInTime(analgesiaData, s1Value, 20, AC.Position.LEFT),
            isS1In20Right = AC.isSacralSensoryInTime(analgesiaData, s1Value, 20, AC.Position.RIGHT),

            isS2In20Left = AC.isSacralSensoryInTime(analgesiaData, s2Value, 20, AC.Position.LEFT),
            isS2In20Right = AC.isSacralSensoryInTime(analgesiaData, s2Value, 20, AC.Position.RIGHT),

            isS1In30Left = AC.isSacralSensoryInTime(analgesiaData, s1Value, 30, AC.Position.LEFT),
            isS1In30Right = AC.isSacralSensoryInTime(analgesiaData, s1Value, 30, AC.Position.RIGHT),

            isS2In30Left = AC.isSacralSensoryInTime(analgesiaData, s2Value, 30, AC.Position.LEFT),
            isS2In30Right = AC.isSacralSensoryInTime(analgesiaData, s2Value, 30, AC.Position.RIGHT);

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
            isS1In20Left,
            isS1In20Right,
            isS1In20Both: isS1In20Left && isS1In20Right,
            isS2In20Left,
            isS2In20Right,
            isS2In20Both: isS2In20Left && isS2In20Right,
            isS1In30Left,
            isS1In30Right,
            isS1In30Both: isS1In30Left && isS1In30Right,
            isS2In30Left,
            isS2In30Right,
            isS2In30Both: isS2In30Left && isS2In30Right,
            maxThoracicSensoryBlockLeft: AC.maxThoracicSensoryBlock(analgesiaData, AC.Position.LEFT),
            maxThoracicSensoryBlockRight: AC.maxThoracicSensoryBlock(analgesiaData, AC.Position.RIGHT),
            minSacralSensoryBlockLeft: AC.minSacralSensoryBlock(analgesiaData, AC.Position.LEFT),
            minSacralSensoryBlockRight: AC.minSacralSensoryBlock(analgesiaData, AC.Position.RIGHT),
            isUnilateralSensoryBlock: AC.isUnilateralSensoryBlock(analgesiaData),
            timePointOfT8: AC.timePointOfThoracicSensoryBlock(analgesiaData, t8Value),
            timePointOfT10: AC.timePointOfThoracicSensoryBlock(analgesiaData, t10Value),
            timePointOfS1: AC.timePointOfSacralSensoryBlock(analgesiaData, s1Value),
            timePointOfS2: AC.timePointOfSacralSensoryBlock(analgesiaData, s2Value),
            pcaCount: (item.observal && item.observal.pcaCount) || '',
            firstPcaTime: (item.observal && item.observal.firstPcaTime) || '',
            manualBolusCount: (item.observal && item.observal.manualBolusCount) || '',
            firstManualBolusTime: (item.observal && item.observal.firstManualBolusTime) || '',
            hasEpiduralCatheterAdjuestment: item.observal && item.observal.hasEpiduralCatheterAdjuestment,
            hasEpiduralCatheterReplacement: item.observal && item.observal.hasEpiduralCatheterReplacement,
            isUnabledToPunctureDura: item.observal && item.observal.isUnabledToPunctureDura,

            durationOfAnalgesia: ~~(timeStamp / 1000 / 60) + 60
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