import AnalgesiaDao from '../dao/AnalgesiaDao.js';
import Response from '../utils/Response.js';
import Data from '../utils/Data.js';

async function createAnalgesiaData(data) {

    Data.verify(data, ['patientId', 'timePoint']);

    const error = [];

    for (let item of data) {

        delete item.id;

        if (await AnalgesiaDao.isAnalgesiaDataExist(item.patientId, item.timePoint)) {
            error.push(`Patient ID ${item.patientId}, timePoint ${item.timePoint} data is exist.`);
        }

        await AnalgesiaDao.createAnalgesiaData(data);

    }

    if (error.length > 0) {
        return Response.buildError(error.join(' '));
    }

    Response.buildSuccess(data.length);

};

async function updateAnalgesiaData(data) {

    Data.verify(data, ['patientId', 'timePoint']);

    const error = [];

    for (let item of data) {

        delete item.id;

        if (!await AnalgesiaDao.isAnalgesiaDataExist(item.patientId, item.timePoint)) {
            error.push(`Patient ID ${item.patientId}, timePoint ${item.timePoint} data is not exist.`);
        }

        await AnalgesiaDao.updateAnalgesiaData(data);

    }

    if (error.length > 0) {
        return Response.buildError(error.join(' '));
    }

    Response.buildSuccess(data.length);

};

export default {
    createAnalgesiaData,
    updateAnalgesiaData
};