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
    for (let item of data) {
        await AnalgesiaModel.create(item);
    }
    return;
}

async function updateAnalgesiaData(data) {
    for (let item of data) {
        await AnalgesiaModel.update(item, {
            where: {
                patientId: {[Sequelize.Op.eq]: item.patientId},
                timePoint: {[Sequelize.Op.eq]: item.timePoint}
            }
        });
    }
    return;
}

export default {
    isAnalgesiaDataExist,
    createAnalgesiaData,
    updateAnalgesiaData
};