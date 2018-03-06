import ObservalDao from '../dao/ObservalDao.js';
import Response from '../utils/Response.js';

async function getObservalDataByPatientId(patientId) {
    return Response.buildSuccess(await ObservalDao.getObservalDataByPatientId(patientId));
};

/**
 * @param data
 * @returns {Promise<*>}
 *
 *  data: {
 *      patientId: String
 *      observalData: Object
 *  }
 */
async function createObservalData(patientId, data) {

    if (await ObservalDao.isObservalDataExist(patientId)) {
        return Response.buildError(`Patient ID ${patientId} Observal Data is exist.`);
    }

    let result;

    try {
        result = await ObservalDao.createObservalData({
            ...data,
            patientId
        });
    } catch (e) {
        return Response.buildError('Add Observal Data failure.');
    }

    return Response.buildSuccess(result);

};

/**
 * @param data
 * @returns {Promise<*>}
 *
 *  data: {
 *      patientId: String
 *      observalData: Object
 *  }
 */
async function updateObservalData(patientId, data) {

    if (!await ObservalDao.isObservalDataExist(patientId)) {
        return Response.buildError(`Patient ID ${patientId} Observal Data is not exist.`);
    }

    let result;

    try {
        result = await ObservalDao.updateObservalData({
            ...data,
            patientId
        });
    } catch (e) {
        return Response.buildError('Update Observal Data failure.');
    }

    return Response.buildSuccess(result);

};

/**
 * @param data
 * @returns {Promise<*>}
 *
 *  data: {
 *      patientId: String
 *      observalData: Object
 *  }
 */
async function createOrUpdateObservalData(patientId, data) {

    let result;

    try {
        result = await ObservalDao.createOrUpdateObservalData({
            ...data,
            patientId
        });
    } catch (e) {
        return Response.buildError('Update Observal Data failure.');
    }

    return Response.buildSuccess(result);

};

export default {

    getObservalDataByPatientId,

    createObservalData,
    updateObservalData,
    createOrUpdateObservalData

};