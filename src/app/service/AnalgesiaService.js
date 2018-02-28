import AnalgesiaDao from '../dao/AnalgesiaDao.js';
import Response from '../utils/Response.js';
import Data from '../utils/Data.js';

/**
 * @param data
 * @returns {Promise<*>}
 *
 *  data: {
 *      patientId: String
 *      analgesiaData: Array
 *  }
 */
async function createAnalgesiaData(data) {

    Data.verify(data, ['patientId', 'timePoint']);

    const error = [];

    for (let item of data.analgesiaData) {

        const analgesiaData = {
            ...item,
            patientId: data.patientId
        };

        if (await AnalgesiaDao.isAnalgesiaDataExist(analgesiaData.patientId, analgesiaData.timePoint)) {
            error.push(`Patient ID ${analgesiaData.patientId}, timePoint ${analgesiaData.timePoint} data is exist.`);
            continue;
        }

        try {
            await AnalgesiaDao.createAnalgesiaData(analgesiaData);
        } catch (e) {
            error.push(`Patient ID ${analgesiaData.patientId}, timePoint ${analgesiaData.timePoint} create failure.`);
        }

    }

    if (error.length > 0) {
        return Response.buildError(error.join(' '));
    }

    Response.buildSuccess(data.analgesiaData.length);

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
async function updateAnalgesiaData(data) {

    Data.verify(data, ['patientId', 'timePoint']);

    const error = [];

    for (let item of data.analgesiaData) {

        const analgesiaData = {
            ...item,
            patientId: data.patientId
        };

        if (!await AnalgesiaDao.isAnalgesiaDataExist(analgesiaData.patientId, analgesiaData.timePoint)) {
            error.push(`Patient ID ${analgesiaData.patientId}, timePoint ${analgesiaData.timePoint} data is not exist.`);
            continue;
        }

        try {
            await AnalgesiaDao.updateAnalgesiaData(analgesiaData);
        } catch (e) {
            error.push(`Patient ID ${analgesiaData.patientId}, timePoint ${analgesiaData.timePoint} update failure.`);
        }

    }

    if (error.length > 0) {
        return Response.buildError(error.join(' '));
    }

    Response.buildSuccess(data.analgesiaData.length);

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
async function createOrUpdateAnalgesiaData(data) {

    Data.verify(data, ['patientId', 'timePoint']);

    const error = [];

    for (let item of data.analgesiaData) {

        const analgesiaData = {
            ...item,
            patientId: data.patientId
        };

        try {
            await AnalgesiaDao.createOrUpdateAnalgesiaData(analgesiaData);
        } catch (e) {
            error.push(`Patient ID ${analgesiaData.patientId}, timePoint ${analgesiaData.timePoint} update failure.`);
        }

    }

    if (error.length > 0) {
        return Response.buildError(error.join(' '));
    }

    Response.buildSuccess(data.analgesiaData.length);

};

export default {
    createAnalgesiaData,
    updateAnalgesiaData,
    createOrUpdateAnalgesiaData
};