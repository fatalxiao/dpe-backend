const PatientService = require('../service/PatientService.js'),
    Response = require('../utils/Response.js');

async function getPatients(ctx, next) {
    const patients = await PatientService.getPatients();
    ctx.response.body = Response.success(patients);
};

async function addPatient(ctx, next) {
    const patientId = await PatientService.addPatient(ctx.request.body);
    ctx.response.body = Response.success(patientId);
};

module.exports = {
    'GET /dpe/patient/getPatients': getPatients,
    'POST /dpe/patient/addPatient': addPatient
};