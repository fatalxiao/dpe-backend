import Sequelize from 'sequelize';

import AnalgesiaModel from '../model/AnalgesiaModel.js';

async function isAnalgesiaDataExist(patientId, timePoint) {
    return await AnalgesiaModel.count({
        where: {
            patientId: {[Sequelize.Op.eq]: patientId},
            timePoint: {[Sequelize.Op.eq]: timePoint}
        }
    }) > 0;
}

async function createAnalgesiaData(data) {
    return await AnalgesiaModel.create(data);
}

async function updateAnalgesiaData(data) {
    return await AnalgesiaModel.update(data, {
        where: {
            patientId: {[Sequelize.Op.eq]: data.patientId},
            timePoint: {[Sequelize.Op.eq]: data.timePoint}
        }
    });
}

async function createOrUpdateAnalgesiaData(data) {
    if (await isAnalgesiaDataExist(data.patientId, data.timePoint)) {
        return updateAnalgesiaData(data);
    } else {
        return createAnalgesiaData(data);
    }
}

export default {

    isAnalgesiaDataExist,

    createAnalgesiaData,
    updateAnalgesiaData,
    createOrUpdateAnalgesiaData

};