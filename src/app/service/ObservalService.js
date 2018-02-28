import ObservalDao from '../dao/ObservalDao.js';
import Response from '../utils/Response.js';

async function createObservalData(data) {

    if (await ObservalDao.isObservalDataExist(data.patientData)) {
        return Response.buildError(`Patient ID ${data.patientData} Observal Data is exist.`);
    }

    let result;

    try {
        result = await ObservalDao.createObservalData(data);
    } catch (e) {
        return Response.buildError('Add Observal Data failure.');
    }

    return Response.buildSuccess(result);

};

async function updateObservalData(data) {

    if (!await ObservalDao.isObservalDataExist(data.patientData)) {
        return Response.buildError(`Patient ID ${data.patientData} Observal Data is not exist.`);
    }

    let result;

    try {
        result = await ObservalDao.updateObservalData(data);
    } catch (e) {
        return Response.buildError('Update Observal Data failure.');
    }

    return Response.buildSuccess(result);

};

async function createOrUpdateObservalData(data) {

    let result;

    try {
        result = await ObservalDao.createOrUpdateObservalData(data);
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