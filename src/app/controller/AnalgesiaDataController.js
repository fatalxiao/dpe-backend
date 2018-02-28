import AnalgesiaService from '../service/AnalgesiaService.js';
import Response from '../utils/Response.js';
import {Api, ApiOperation, GetMapping, PostMapping, RequestBody} from '../utils/ApiDecorator';

@Api({tags: 'AnalgesiaData'})
class AnalgesiaDataController {

    @PostMapping({value: '/dpe/patient/createPatientInformation'})
    @ApiOperation({value: 'create new patient', notes: 'create new patient'})
    @RequestBody({value: 'patients'})
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

        ctx.response.body = await AnalgesiaService.createPatientInformation(requestData);

    }

};

export default PatientController;