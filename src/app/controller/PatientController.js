const PatientService = require('../service/PatientService.js'),
    Api = require('../utils/Api'),
    Response = require('../utils/Response');

const getPatients = Api.decorator(Api.API_TYPE_GET, '/dpe/patient/getPatients', async (ctx, next) => {
    ctx.response.body = await PatientService.getPatients();
});

const addPatient = Api.decorator(Api.API_TYPE_POST, '/dpe/patient/addPatient', async (ctx, next) => {

    const requestData = ctx.request.body;

    if (!requestData.groupId) {
        return ctx.response.body = Response.buildParamError('Group ID is required');
    }

    if (!requestData.id) {
        return ctx.response.body = Response.buildParamError('ID is required');
    }

    if (!requestData.patientName) {
        return ctx.response.body = Response.buildParamError('Patient Name is required');
    }

    ctx.response.body = await PatientService.addPatient(ctx.request.body);

});

module.exports = {
    getPatients,
    addPatient
};