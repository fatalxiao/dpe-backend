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

    @PostMapping({value: '/dpe/patient/addPatient'})
    @ApiOperation({value: 'add new patient', notes: 'add new patient'})
    @RequestBody({value: 'patients'})
    static async addPatient(ctx) {

        const requestData = ctx.request.body;
        let error;

        if (!requestData.id) {
            error = Response.buildParamError('ID is required');
        } else if (!requestData.patient || !requestData.patient.groupId) {
            error = Response.buildParamError('Group ID is required');
        } else if (!requestData.patient || !requestData.patient.patientName) {
            error = Response.buildParamError('Patient Name is required');
        }

        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await PatientService.addPatient(requestData);

    }

};

export default PatientController;