const PatientDao = require('../dao/PatientDao.js'),
    Response = require('../utils/Response.js');

async function getPatients() {
    return Response.buildSuccess(await PatientDao.getPatients());
};

async function addPatient(formData) {
    return Response.buildSuccess(await PatientDao.addPatient(formData));
};

module.exports = {
    getPatients,
    addPatient
};