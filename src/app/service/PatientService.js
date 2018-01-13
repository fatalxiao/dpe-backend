const PatientDao = require('../dao/PatientDao.js');

async function getPatients() {
    return PatientDao.getPatients();
};

module.exports = {
    getPatients
};