import PatientService from '../service/PatientService.js';
import Response from '../utils/Response.js';
import {Api, ApiOperation, GetMapping, PostMapping, RequestBody} from '../utils/ApiDecorator';

@Api({tags: 'Patient'})
class PatientController {

    static verifyRequestData(requestData) {

        if (!requestData) {
            return Response.buildParamError('Request Data is required');
        } else if (!requestData.id) {
            return Response.buildParamError('ID is required');
        } else if (!requestData.groupId) {
            return Response.buildParamError('Group is required');
        } else if (!requestData.patientName) {
            return Response.buildParamError('Patient Name is required');
        }

        return;

    }

    @GetMapping({value: '/dpe/patient/getPatients'})
    @ApiOperation({value: 'get patients', notes: 'get all patients'})
    static async getPatients(ctx) {
        ctx.response.body = await PatientService.getPatients();
    }

    @PostMapping({value: '/dpe/patient/createPatient'})
    @ApiOperation({value: 'create new patient', notes: 'create new patient'})
    @RequestBody({value: 'Patients'})
    static async createPatient(ctx) {

        const requestData = ctx.request.body;

        let error = PatientController.verifyRequestData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await PatientService.createPatient(requestData);

    }

    @PostMapping({value: '/dpe/patient/updatePatient'})
    @ApiOperation({value: 'update patient', notes: 'update patient'})
    @RequestBody({value: 'Patients'})
    static async updatePatient(ctx) {

        const requestData = ctx.request.body;

        let error = PatientController.verifyRequestData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await PatientService.updatePatient(requestData);

    }

    @PostMapping({value: '/dpe/patient/createOrUpdatePatient'})
    @ApiOperation({value: 'create or update patient', notes: 'create or update patient'})
    @RequestBody({value: 'Patients'})
    static async createOrUpdatePatient(ctx) {

        const requestData = ctx.request.body;

        let error = PatientController.verifyRequestData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await PatientService.createOrUpdatePatient(requestData);

    }

};

export default PatientController;