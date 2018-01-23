import _ from 'lodash';
import PatientService from '../service/PatientService.js';
import AnalgesiaDataService from '../service/AnalgesiaDataService.js';
import Response from '../utils/Response.js';
import {Api, ApiOperation, GetMapping, PostMapping, RequestBody} from '../utils/ApiDecorator';

@Api({tags: 'Patient'})
export default class PatientController {

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

    }

    @PostMapping({value: '/dpe/patient/updateAnalgesiaData'})
    @ApiOperation({value: 'update analgesia data', notes: 'update analgesia data to the patient'})
    @RequestBody({value: 'analgesia_data'})
    static async updateAnalgesiaData(ctx) {

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

    }

};