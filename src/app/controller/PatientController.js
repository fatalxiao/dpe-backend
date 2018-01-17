const PatientService = require('../service/PatientService.js'),
    Response = require('../utils/Response.js');

async function getPatients(ctx, next) {
    ctx.response.body = await PatientService.getPatients();
};

async function addPatient(ctx, next) {
    ctx.response.body = await PatientService.addPatient(ctx.request.body);
};

module.exports = {
    'GET /dpe/patient/getPatients': getPatients,
    'POST /dpe/patient/addPatient': addPatient
};