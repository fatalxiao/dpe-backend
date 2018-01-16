const PatientService = require('../service/PatientService.js'),
    response = require('../utils/response.js');

async function getPatients(ctx, next) {
    const patients = await PatientService.getPatients();
    ctx.response.body = response.success(patients);
};

module.exports = {
    'GET /dpe/patient/getPatients': getPatients
};