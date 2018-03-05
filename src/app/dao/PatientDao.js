import Sequelize from 'sequelize';

import PatientModel from '../model/PatientModel.js';
import Group from '../model/GroupModel.js';

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

async function getPatientById(id) {
    return await PatientModel.find({
        where: {
            id: {[Sequelize.Op.eq]: id}
        },
        include: [{
            model: Group,
            as: 'group',
            where: {id: Sequelize.col('patients.group_id')}
        }]
    });
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

async function enablePatient(id) {
    return await PatientModel.update({
        disabled: false
    }, {
        where: {
            id: {[Sequelize.Op.eq]: id}
        }
    });
}

async function disablePatient(id) {
    return await PatientModel.update({
        disabled: true
    }, {
        where: {
            id: {[Sequelize.Op.eq]: id}
        }
    });
}

export default {

    getPatients,

    isPatientExist,

    getPatientById,

    createPatient,
    updatePatient,
    createOrUpdatePatient,

    enablePatient,
    disablePatient

};