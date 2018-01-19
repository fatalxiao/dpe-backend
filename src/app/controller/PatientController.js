const PatientService = require('../service/PatientService.js'),
    Api = require('../utils/Api');

const getPatients = Api.decorator(Api.API_TYPE_GET, '/dpe/patient/getPatients', async function (ctx, next) {
    ctx.response.body = await PatientService.getPatients();
});

const addPatient = Api.decorator(Api.API_TYPE_POST, '/dpe/patient/addPatient', async function (ctx, next) {
    ctx.response.body = await PatientService.addPatient(ctx.request.body);
});

module.exports = {
    getPatients,
    addPatient
};