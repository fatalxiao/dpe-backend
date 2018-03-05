import AnalgesiaDao from '../dao/AnalgesiaDao.js';
import Response from '../utils/Response.js';
import DataFormat from '../utils/DataFormat.js';

function formatData(data) {
    DataFormat.number(data, ['timePoint', 'vasScore', 'thoracicSensoryBlockLeftValue', 'thoracicSensoryBlockRightValue',
        'thoracicSensoryBlockRightValue', 'sacralSensoryBlockRightValue', 'bromageScore', 'systolicBloodPressure',
        'diastolicBloodPressure', 'heartRate', 'pulseOxygenSaturation', 'fetalHeartRate']);
}

async function getAnalgesiaDataByPatientId(patientId) {
    return Response.buildSuccess(await AnalgesiaDao.getAnalgesiaDataByPatientId(patientId));
};

/**
 * @param data
 * @returns {Promise<*>}
 *
 *  data: {
 *      patientId: String
 *      analgesiaData: Array
 *  }
 */
async function createAnalgesiaData(patientId, data) {

    const error = [];

    for (let item of data) {

        const analgesiaData = {
            ...item,
            patientId
        };

        if (await AnalgesiaDao.isAnalgesiaDataExist(patientId, analgesiaData.timePoint)) {
            error.push(`Patient ID ${patientId}, timePoint ${analgesiaData.timePoint} data is exist.`);
            continue;
        }

        try {
            formatData(analgesiaData);
            await AnalgesiaDao.createAnalgesiaData(analgesiaData);
        } catch (e) {
            error.push(`Patient ID ${patientId}, timePoint ${analgesiaData.timePoint} create failure.`);
        }

    }

    if (error.length > 0) {
        return Response.buildError(error.join(' '));
    }

    return Response.buildSuccess(data.length);

};

/**
 * @param data
 * @returns {Promise<*>}
 *
 *  data: {
 *      patientId: String
 *      analgesiaData: Array
 *  }
 */
async function updateAnalgesiaData(patientId, data) {

    const error = [];

    for (let item of data) {

        const analgesiaData = {
            ...item,
            patientId
        };

        if (!await AnalgesiaDao.isAnalgesiaDataExist(patientId, analgesiaData.timePoint)) {
            error.push(`Patient ID ${patientId}, timePoint ${analgesiaData.timePoint} data is not exist.`);
            continue;
        }

        try {
            formatData(analgesiaData);
            await AnalgesiaDao.updateAnalgesiaData(analgesiaData);
        } catch (e) {
            error.push(`Patient ID ${patientId}, timePoint ${analgesiaData.timePoint} update failure.`);
        }

    }

    if (error.length > 0) {
        return Response.buildError(error.join(' '));
    }

    return Response.buildSuccess(data.length);

};

/**
 * @param data
 * @returns {Promise<*>}
 *
 *  data: {
 *      patientId: String
 *      analgesiaData: Array
 *  }
 */
async function createOrUpdateAnalgesiaData(patientId, data) {

    const error = [];

    for (let item of data) {

        const analgesiaData = {
            ...item,
            patientId
        };

        try {
            formatData(analgesiaData);
            await AnalgesiaDao.createOrUpdateAnalgesiaData(analgesiaData);
        } catch (e) {
            error.push(`Patient ID ${patientId}, timePoint ${analgesiaData.timePoint} update failure.`);
        }

    }

    if (error.length > 0) {
        return Response.buildError(error.join(' '));
    }

    return Response.buildSuccess(data.length);

};

export default {

    getAnalgesiaDataByPatientId,

    createAnalgesiaData,
    updateAnalgesiaData,
    createOrUpdateAnalgesiaData

};