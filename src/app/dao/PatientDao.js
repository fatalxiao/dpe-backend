import Sequelize from 'sequelize';

import Patient from '../model/PatientModel.js';
import ObservalData from '../model/ObservalDataModel.js';

async function getPatients() {
    return await Patient.findAll();
}

async function addPatientInfomation(data) {
    return await Patient.create(data);
}

async function addAnalgesiaData(data) {
    return await Patient.create(data);
}

async function isObservalDataExist(patientId) {
    return await ObservalData.count({
        where: {
            'patientId': {[Sequelize.Op.eq]: patientId}
        }
    }) > 0;
}

async function createOrUpdateObservalData(data) {
    if (await isObservalDataExist(data.patientId)) {
        return await ObservalData.update(data, {
            where: {
                'patientId': {[Sequelize.Op.eq]: data.patientId}
            }
        });
    } else {
        return await ObservalData.create(data);
    }
}

export default {
    getPatients,
    addPatientInfomation,
    addAnalgesiaData,
    createOrUpdateObservalData
};