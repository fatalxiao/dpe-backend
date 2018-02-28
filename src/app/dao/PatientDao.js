import Sequelize from 'sequelize';

import PatientModel from '../model/PatientModel.js';
import AnalgesiaDataModel from '../model/AnalgesiaDataModel.js';
import ObservalDataModel from '../model/ObservalDataModel.js';

async function getPatients() {
    return await PatientModel.findAll();
}

async function isPatientInfomationExist(id) {
    return await PatientModel.count({
        where: {
            id: {[Sequelize.Op.eq]: id}
        }
    }) > 0;
}

async function createOrUpdatePatientInfomation(data) {
    if (await isPatientInfomationExist(data.id)) {
        return await PatientModel.update(data, {
            where: {
                id: {[Sequelize.Op.eq]: data.id}
            }
        });
    } else {
        return await PatientModel.create(data);
    }
}

async function isAnalgesiaDataExist(patientId, timePoint) {
    return await AnalgesiaDataModel.count({
        where: {
            patientId: {[Sequelize.Op.eq]: patientId},
            timePoint: {[Sequelize.Op.eq]: timePoint}
        }
    }) > 0;
}

async function createOrUpdateAnalgesiaData(data) {
    for (let item of data) {
        if (await isAnalgesiaDataExist(item.patientId, item.timePoint)) {
            await AnalgesiaDataModel.update(item, {
                where: {
                    patientId: {[Sequelize.Op.eq]: item.patientId},
                    timePoint: {[Sequelize.Op.eq]: item.timePoint}
                }
            });
        } else {
            await AnalgesiaDataModel.create(item);
        }
    }
    return;
}

async function isObservalDataExist(patientId) {
    return await ObservalDataModel.count({
        where: {
            patientId: {[Sequelize.Op.eq]: patientId}
        }
    }) > 0;
}

async function createOrUpdateObservalData(data) {
    if (await isObservalDataExist(data.patientId)) {
        return await ObservalDataModel.update(data, {
            where: {
                patientId: {[Sequelize.Op.eq]: data.patientId}
            }
        });
    } else {
        return await ObservalDataModel.create(data);
    }
}

export default {

    getPatients,

    isPatientInfomationExist,
    createOrUpdatePatientInfomation

    // isAnalgesiaDataExist,
    // createOrUpdateAnalgesiaData,
    //
    // isObservalDataExist,
    // createOrUpdateObservalData

};