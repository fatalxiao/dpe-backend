import ObservalDao from '../dao/ObservalDao.js';
import Response from '../utils/Response.js';

/**
 * @param data
 * @returns {Promise<*>}
 *
 *  data: {
 *      patientId: String
 *      observalData: Object
 *  }
 */
async function createObservalData(data) {

    if (await ObservalDao.isObservalDataExist(data.patientId)) {
        return Response.buildError(`Patient ID ${data.patientId} Observal Data is exist.`);
    }

    let result;

    try {
        result = await ObservalDao.createObservalData({
            ...data.observalData,
            patientId: data.patientId
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
async function updateObservalData(data) {

    if (!await ObservalDao.isObservalDataExist(data.patientId)) {
        return Response.buildError(`Patient ID ${data.patientId} Observal Data is not exist.`);
    }

    let result;

    try {
        result = await ObservalDao.updateObservalData({
            ...data.observalData,
            patientId: data.patientId
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
async function createOrUpdateObservalData(data) {

    let result;

    try {
        result = await ObservalDao.createOrUpdateObservalData({
            ...data.observalData,
            patientId: data.patientId
        });
    } catch (e) {
        return Response.buildError('Update Observal Data failure.');
    }

    return Response.buildSuccess(result);

};

export default {
    createObservalData,
    updateObservalData,
    createOrUpdateObservalData
};