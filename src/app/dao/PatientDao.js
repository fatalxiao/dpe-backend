import Sequelize from 'sequelize';

import PatientModel from '../model/PatientModel.js';

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

async function createOrUpdatePatientInfomation(data) {
    if (await isPatientInfomationExist(data.id)) {
        return updatePatientInfomation(data);
    } else {
        return createPatientInfomation(data);
    }
}

export default {

    getPatients,

    isPatientInfomationExist,

    createPatientInfomation,
    updatePatientInfomation,
    createOrUpdatePatientInfomation

};