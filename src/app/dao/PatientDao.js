import Patient from '../model/PatientModel.js';

async function getPatients() {
    return await Patient.findAll();
}

async function addPatientInfomation(data) {
    return await Patient.create(data);
}

async function addAnalgesiaData(data) {
    return await Patient.create(data);
}

async function addObservalData(data) {
    return await Patient.create(data);
}

export default {
    getPatients,
    addPatientInfomation,
    addAnalgesiaData,
    addObservalData
};