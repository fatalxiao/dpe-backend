import Sequelize from 'sequelize';

import PatientModel from '../model/PatientModel.js';

async function getPatients() {
    return await PatientModel.findAll();
}

async function isPatientExist(id) {
    return await PatientModel.count({
        where: {
            id: {[Sequelize.Op.eq]: id}
        }
    }) > 0;
}

async function createPatient(data) {
    return await PatientModel.create(data);
}

async function updatePatient(data) {
    return await PatientModel.update(data, {
        where: {
            id: {[Sequelize.Op.eq]: data.id}
        }
    });
}

async function createOrUpdatePatient(data) {
    if (await isPatientExist(data.id)) {
        return updatePatient(data);
    } else {
        return createPatient(data);
    }
}

export default {

    getPatients,

    isPatientExist,

    createPatient,
    updatePatient,
    createOrUpdatePatient

};