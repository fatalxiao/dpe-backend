import Patient from '../model/PatientModel.js';

async function getPatients() {
    return await Patient.findAll();
}

async function addPatient(data) {
    return await Patient.create(data);
}

export default {
    getPatients,
    addPatient
};