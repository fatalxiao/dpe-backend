const PatientDao = require('../dao/PatientDao.js');

async function getPatients() {
    return await PatientDao.getPatients();
};

module.exports = {
    getPatients
};