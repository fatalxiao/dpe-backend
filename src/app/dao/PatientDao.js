const Patient = require('../model/PatientModel');

async function getPatients() {
    return await Patient.findAll();
}

async function addPatient(formData) {
    return await Patient.create(formData);
}

module.exports = {
    getPatients,
    addPatient
};