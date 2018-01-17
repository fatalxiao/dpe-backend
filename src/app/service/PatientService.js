const PatientDao = require('../dao/PatientDao.js'),
    Response = require('../utils/Response.js');

async function getPatients() {
    return Response.success(await PatientDao.getPatients());
};

async function addPatient() {
    return Response.success(await PatientDao.addPatient());
};

module.exports = {
    getPatients,
    addPatient
};