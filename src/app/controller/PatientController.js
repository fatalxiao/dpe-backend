const _ = require('lodash'),
    PatientService = require('../service/PatientService.js'),
    AnalgesiaDataService = require('../service/AnalgesiaDataService.js'),
    Api = require('../utils/Api'),
    Response = require('../utils/Response');

const getPatients = Api.decorator(Api.API_TYPE_GET, '/dpe/patient/getPatients', async ctx => {
    ctx.response.body = await PatientService.getPatients();
});

const addPatient = Api.decorator(Api.API_TYPE_POST, '/dpe/patient/addPatient', async ctx => {

    const requestData = ctx.request.body;
    let error;

    if (!requestData.groupId) {
        error = Response.buildParamError('Group ID is required');
    } else if (!requestData.id) {
        error = Response.buildParamError('ID is required');
    } else if (!requestData.patientName) {
        error = Response.buildParamError('Patient Name is required');
    }

    if (error) {
        return ctx.response.body = error;
    }

    ctx.response.body = await PatientService.addPatient(requestData);

});

const updateAnalgesiaData = Api.decorator(Api.API_TYPE_POST, '/dpe/patient/updateAnalgesiaData', async ctx => {

    const requestData = ctx.request.body;
    let error;

    if (!requestData.patientId) {
        error = Response.buildParamError('Patient ID is required');
    } else if (!requestData.analgesiaData || !_.isArray(requestData.analgesiaData)) {
        error = Response.buildParamError('Analgesia Data is required');
    }

    if (error) {
        return ctx.response.body = error;
    }

    ctx.response.body = await AnalgesiaDataService.updateAnalgesiaData(requestData);

});

module.exports = {
    getPatients,
    addPatient,
    updateAnalgesiaData
};