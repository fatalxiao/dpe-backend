import Sequelize from 'sequelize';

import ObservalModel from '../model/ObservalModel.js';

async function isObservalDataExist(patientId) {
    return await ObservalModel.count({
        where: {
            patientId: {[Sequelize.Op.eq]: patientId}
        }
    }) > 0;
}

async function createObservalData(data) {
    return await ObservalModel.create(data);
}

async function updateObservalData(data) {
    return await ObservalModel.update(data, {
        where: {
            patientId: {[Sequelize.Op.eq]: data.patientId}
        }
    });
}

export default {
    isObservalDataExist,
    createObservalData,
    updateObservalData
};