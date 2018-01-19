const PatientService = require('../service/PatientService.js'),
    Api = require('../utils/ApiDecorator'),
    Response = require('../utils/Response.js');

@Api
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