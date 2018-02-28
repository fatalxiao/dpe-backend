import Sequelize from 'sequelize';

import PatientModel from '../model/PatientModel.js';
import AnalgesiaDataModel from '../model/AnalgesiaModel.js';
import ObservalDataModel from '../model/ObservalModel.js';

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

async function createPatientInfomation(data) {
    return await PatientModel.create(data);
}

async function updatePatientInfomation(data) {
    return await PatientModel.update(data, {
        where: {
            id: {[Sequelize.Op.eq]: data.id}
        }
    });
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