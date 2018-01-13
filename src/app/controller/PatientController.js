const PatientService = require('../service/PatientService.js'),
    response = require('../utils/response.js');

function getPatients(ctx, next) {

    const patients = PatientService.getPatients();

    // ctx.response.type = 'text/html';
    ctx.response.body = response.success(patients);

};

module.exports = {
    'GET /dpe/patient/getPatients': getPatients
    // 'POST /saveUserinfo': saveUserinfo
};