const PatientService = require('../service/PatientService.js'),
    AnalgesiaDataService = require('../service/AnalgesiaDataService.js'),
    Api = require('../utils/Api'),
    Response = require('../utils/Response');

const getPatients = Api.decorator(Api.API_TYPE_GET, '/dpe/patient/getPatients', async ctx => {
    ctx.response.body = await PatientService.getPatients();
});

const addPatient = Api.decorator(Api.API_TYPE_POST, '/dpe/patient/addPatient', async ctx => {

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

    ctx.response.body = await PatientService.addPatient(requestData);

});

const updateAnalgesiaData = Api.decorator(Api.API_TYPE_POST, '/dpe/patient/updateAnalgesiaData', async ctx => {

    const requestData = ctx.request.body;

    if (!requestData.patientId) {
        return ctx.response.body = Response.buildParamError('Patient ID is required');
    }

    ctx.response.body = await AnalgesiaDataService.updateAnalgesiaData(requestData);

});

module.exports = {
    getPatients,
    addPatient,
    updateAnalgesiaData
};