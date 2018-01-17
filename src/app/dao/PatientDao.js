const Patient = require('../model/PatientModel');

async function getPatients() {
    return await Patient.findAll();
}

async function addPatient() {
    // return await Patient.findAll();
}

module.exports = {
    getPatients,
    addPatient
};