import PatientService from '../service/PatientService.js';
import Response from '../utils/Response.js';
import {Api, ApiOperation, GetMapping, PostMapping, RequestBody} from '../utils/ApiDecorator';

@Api({tags: 'Patient'})
class PatientController {

    @GetMapping({value: '/dpe/patient/getPatients'})
    @ApiOperation({value: 'get patients', notes: 'get all patients'})
    static async getPatients(ctx) {
        ctx.response.body = await PatientService.getPatients();
    }

    @PostMapping({value: '/dpe/patient/createPatientInformation'})
    @ApiOperation({value: 'create new patient', notes: 'create new patient'})
    @RequestBody({value: 'Patients'})
    static async createPatientInformation(ctx) {

        const requestData = ctx.request.body;
        let error;

        if (!requestData.id) {
            error = Response.buildParamError('ID is required');
        } else if (!requestData.groupId) {
            error = Response.buildParamError('Group is required');
        } else if (!requestData.patientName) {
            error = Response.buildParamError('Patient Name is required');
        }

        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await PatientService.createPatientInformation(requestData);

    }

    @PostMapping({value: '/dpe/patient/updatePatientInformation'})
    @ApiOperation({value: 'update patient information', notes: 'update patient information'})
    @RequestBody({value: 'Patients'})
    static async updatePatientInformation(ctx) {

        const requestData = ctx.request.body;
        let error;

        if (!requestData.id) {
            error = Response.buildParamError('ID is required');
        } else if (!requestData.groupId) {
            error = Response.buildParamError('Group is required');
        } else if (!requestData.patientName) {
            error = Response.buildParamError('Patient Name is required');
        }

        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await PatientService.updatePatientInformation(requestData);

    }

    @PostMapping({value: '/dpe/patient/createOrUpdatePatientInfomation'})
    @ApiOperation({value: 'create or update patient information', notes: 'create or update patient information'})
    @RequestBody({value: 'Patients'})
    static async createOrUpdatePatientInfomation(ctx) {

        const requestData = ctx.request.body;
        let error;

        if (!requestData.id) {
            error = Response.buildParamError('ID is required');
        } else if (!requestData.groupId) {
            error = Response.buildParamError('Group is required');
        } else if (!requestData.patientName) {
            error = Response.buildParamError('Patient Name is required');
        }

        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await PatientService.createOrUpdatePatientInfomation(requestData);

    }

};

export default PatientController;