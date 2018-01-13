const PatientService = require('../service/PatientService.js');

function getPatients(ctx, next) {

    const patients = PatientService.getPatients();

    // ctx.response.type = 'text/html';
    ctx.response.body = JSON.stringify({
        data: patients
    });

};

module.exports = {
    'GET /getPatients': getPatients
    // 'POST /saveUserinfo': saveUserinfo
};