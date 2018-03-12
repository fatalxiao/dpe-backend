import Sequelize from 'sequelize';

import PatientModel from '../model/PatientModel.js';
import Group from '../model/GroupModel.js';

async function getPatients() {
    return await PatientModel.findAll({
        order: [
            ['ctime', 'DESC']
        ],
        include: [{
            model: Group,
            as: 'group',
            where: {id: Sequelize.col('patients.group_id')}
        }]
    });
}

async function getFullPatients() {
    return await PatientModel.findAll({
        order: [
            ['ctime', 'DESC']
        ],
        include: [{all: true}]
    });
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
        status: 1
    }, {
        where: {
            id: {[Sequelize.Op.eq]: id}
        }
    });
}

async function disablePatient(id) {
    return await PatientModel.update({
        status: 0
    }, {
        where: {
            id: {[Sequelize.Op.eq]: id}
        }
    });
}

export default {

    getPatients,
    getFullPatients,

    isPatientExist,

    getPatientById,

    createPatient,
    updatePatient,
    createOrUpdatePatient,

    enablePatient,
    disablePatient

};