const PatientDao = require('../dao/PatientDao.js');

async function getPatients() {
    return await PatientDao.getPatients();
};

async function addPatient() {
    return await PatientDao.addPatient();
};

module.exports = {
    getPatients,
    addPatient
};