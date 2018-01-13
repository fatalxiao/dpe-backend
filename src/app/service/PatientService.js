const PatientDao = require('../dao/PatientDao.js');

async function getPatients() {

    const result = await PatientDao.getPatients();

    return result;

};

module.exports = {
    getPatients
};