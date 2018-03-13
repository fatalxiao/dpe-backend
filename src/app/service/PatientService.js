import PatientDao from '../dao/PatientDao.js';
import SensoryBlockDao from '../dao/SensoryBlockDao.js';

import Response from '../utils/Response.js';
import AC from '../utils/AnalgesiaCalculation.js';
import OC from '../utils/ObservalCalculation.js';
import Time from '../utils/Time.js';
import DataFormat from '../utils/DataFormat.js';

async function getPatients() {
    return Response.buildSuccess(await PatientDao.getPatients());
};

async function getFullPatients() {
    return Response.buildSuccess(await PatientDao.getFullPatients());
};

async function exportPatients() {

    const boolHandler = DataFormat.formatBooleanToNumber;

    const data = await PatientDao.getFullPatients(),
        sensoryBlocks = await SensoryBlockDao.getSensoryBlocks(),

        s1Value = sensoryBlocks.find(item => item.type === 2 && item.name === 'S1').value,
        s2Value = sensoryBlocks.find(item => item.type === 2 && item.name === 'S2').value,
        t8Value = sensoryBlocks.find(item => item.type === 1 && item.name === 'T8').value,
        t10Value = sensoryBlocks.find(item => item.type === 1 && item.name === 'T10').value;

    data.map(item => {

        const result = {
            group: item.group ? item.group.name : '',
            name: item.name,
            id: item.id,
            age: item.age,
            height: item.height,
            weight: item.weight,
            bmi: item.weight / ((item.height / 100) ** 2),
            gestationalDays: item.gestationalDays,
            initialVasScore: item.initialVasScore,
            cervicalDilationAtTimeOfEA: item.cervicalDilationAtTimeOfEA,
            systolicBloodPressure: item.systolicBloodPressure,
            diastolicBloodPressure: item.diastolicBloodPressure,
            heartRate: item.heartRate,
            pulseOxygenSaturation: item.pulseOxygenSaturation,
            fetalHeartRate: item.fetalHeartRate,
            hasOxytocinAtTimeOfEA: boolHandler(item.hasOxytocinAtTimeOfEA)

        };

        if (item.analgesia) {

            const analgesiaData = AC.fullFillAnalgesiaData(item.analgesia),

                isS1In20Left = AC.isSacralSensoryInTime(analgesiaData, s1Value, 20, AC.Position.LEFT),
                isS1In20Right = AC.isSacralSensoryInTime(analgesiaData, s1Value, 20, AC.Position.RIGHT),

                isS2In20Left = AC.isSacralSensoryInTime(analgesiaData, s2Value, 20, AC.Position.LEFT),
                isS2In20Right = AC.isSacralSensoryInTime(analgesiaData, s2Value, 20, AC.Position.RIGHT),

                isS1In30Left = AC.isSacralSensoryInTime(analgesiaData, s1Value, 30, AC.Position.LEFT),
                isS1In30Right = AC.isSacralSensoryInTime(analgesiaData, s1Value, 30, AC.Position.RIGHT),

                isS2In30Left = AC.isSacralSensoryInTime(analgesiaData, s2Value, 30, AC.Position.LEFT),
                isS2In30Right = AC.isSacralSensoryInTime(analgesiaData, s2Value, 30, AC.Position.RIGHT);

            result.isVasLessThan1In20 = boolHandler(AC.isVasLessThan1(analgesiaData, 20));
            result.isVasLessThan1In30 = boolHandler(AC.isVasLessThan1(analgesiaData, 30));
            result.timePointOfVasLessThan1 = AC.timePointOfVasLessThan1(analgesiaData);
            result.isS1In20Left = boolHandler(isS1In20Left);
            result.isS1In20Right = boolHandler(isS1In20Right);
            result.isS1In20Both = boolHandler(isS1In20Left && isS1In20Right);
            result.isS2In20Left = boolHandler(isS2In20Left);
            result.isS2In20Right = boolHandler(isS2In20Right);
            result.isS2In20Both = boolHandler(isS2In20Left && isS2In20Right);
            result.isS1In30Left = boolHandler(isS1In30Left);
            result.isS1In30Right = boolHandler(isS1In30Right);
            result.isS1In30Both = boolHandler(isS1In30Left && isS1In30Right);
            result.isS2In30Left = boolHandler(isS2In30Left);
            result.isS2In30Right = boolHandler(isS2In30Right);
            result.isS2In30Both = boolHandler(isS2In30Left && isS2In30Right);
            result.maxThoracicSensoryBlockLeft = AC.maxThoracicSensoryBlock(analgesiaData, AC.Position.LEFT);
            result.maxThoracicSensoryBlockRight = AC.maxThoracicSensoryBlock(analgesiaData, AC.Position.RIGHT);
            result.minSacralSensoryBlockLeft = AC.minSacralSensoryBlock(analgesiaData, AC.Position.LEFT);
            result.minSacralSensoryBlockRight = AC.minSacralSensoryBlock(analgesiaData, AC.Position.RIGHT);
            result.isUnilateralSensoryBlock = boolHandler(AC.isUnilateralSensoryBlock(analgesiaData));
            result.timePointOfT8 = AC.timePointOfThoracicSensoryBlock(analgesiaData, t8Value);
            result.timePointOfT10 = AC.timePointOfThoracicSensoryBlock(analgesiaData, t10Value);
            result.timePointOfS1 = AC.timePointOfSacralSensoryBlock(analgesiaData, s1Value);
            result.timePointOfS2 = AC.timePointOfSacralSensoryBlock(analgesiaData, s2Value);

        }

        if (item.observal) {
            result.pcaCount = item.observal.pcaCount;
            result.firstPcaTime = item.observal.firstPcaTime;
            result.manualBolusCount = item.observal.manualBolusCount;
            result.firstManualBolusTime = item.observal.firstManualBolusTime;
            result.hasEpiduralCatheterAdjuestment = boolHandler(item.observal.hasEpiduralCatheterAdjuestment);
            result.hasEpiduralCatheterReplacement = boolHandler(item.observal.hasEpiduralCatheterReplacement);
            result.isUnabledToPunctureDura = boolHandler(item.observal.isUnabledToPunctureDura);
            result.isIVEpiduralCatheterInsertion = boolHandler(item.observal.isIVEpiduralCatheterInsertion);
            result.isIntrathecalEpiduralCatheterInsertion = boolHandler(item.observal.isIntrathecalEpiduralCatheterInsertion);
            result.durationOfAnalgesia = OC.durationOfAnalgesia(item.observal);
            result.anestheticsConsumption = OC.anestheticsConsumption(item.observal);
            result.durationOfFirstStageOfLabor = item.observal.durationOfFirstStageOfLabor;
            result.durationOfSecondStageOfLabor = item.observal.durationOfSecondStageOfLabor;
            // 单位时间局麻药消耗
            result.blood_lose = item.observal.blood_lose;
            // 是否胎心下降
        }

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