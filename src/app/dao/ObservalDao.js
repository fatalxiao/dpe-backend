import Sequelize from 'sequelize';

import Observal from '../model/ObservalModel.js';

async function getObservalDataByPatientId(patientId) {
    return await Observal.find({
        where: {
            patientId: {[Sequelize.Op.eq]: patientId}
        }
    });
}

async function isObservalDataExist(patientId) {
    return await Observal.count({
        where: {
            patientId: {[Sequelize.Op.eq]: patientId}
        }
    }) > 0;
}

async function createObservalData(data) {
    return await Observal.create(data);
}

async function updateObservalData(data) {
    return await Observal.update(data, {
        where: {
            patientId: {[Sequelize.Op.eq]: data.patientId}
        }
    });
}

async function createOrUpdateObservalData(data) {
    if (await isObservalDataExist(data.patientId)) {
        return updateObservalData(data);
    } else {
        return createObservalData(data);
    }
}

export default {

    getObservalDataByPatientId,

    isObservalDataExist,

    createObservalData,
    updateObservalData,
    createOrUpdateObservalData

};