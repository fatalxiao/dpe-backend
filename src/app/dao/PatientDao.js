const Patient = require('../model/PatientModel');

async function getPatients() {
    return await Patient.findAll();
}

async function addPatient(data) {
    return await Patient.create(data);
}

module.exports = {
    getPatients,
    addPatient
};