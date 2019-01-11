import xlsx from 'node-xlsx';
import moment from 'moment';

import PatientService from '../service/PatientService.js';
import ExportService from '../service/ExportService.js';
import Response from '../utils/Response.js';
import {Api, ApiOperation, GetMapping, PostMapping} from '../utils/ApiDecorator';

@Api({tags: 'Patient'})
class PatientController {

    static verifyCreateData(requestData) {

        if (!requestData) {
            return Response.buildParamError('Request Data is required');
        } else if (!requestData.id) {
            return Response.buildParamError('ID is required');
        } else if (!requestData.groupId) {
            return Response.buildParamError('Group is required');
        } else if (!requestData.name) {
            return Response.buildParamError('Name is required');
        }

        return;

    }

    static verifyUpdateData(requestData) {

        if (!requestData) {
            return Response.buildParamError('Request Data is required');
        } else if (!requestData.id) {
            return Response.buildParamError('ID is required');
        }

        return;

    }

    @GetMapping({value: '/dpe/patient/getPatients'})
    @ApiOperation({value: 'get patients', notes: ''})
    static async getPatients(ctx) {
        ctx.response.body = await PatientService.getPatients();
    }

    @GetMapping({value: '/dpe/patient/getFullPatients'})
    @ApiOperation({value: 'get full patients', notes: ''})
    static async getFullPatients(ctx) {
        ctx.response.body = await PatientService.getFullPatients();
    }

    @GetMapping({value: '/dpe/patient/exportPatients'})
    @ApiOperation({value: 'export patients', notes: ''})
    static async exportPatients(ctx) {

        const {dpeData, meanVASData, meanVASWithContractionData, laterMeanVASData} = await ExportService.getExportData();

        ctx.set('Content-Type', 'application/vnd.openxmlformats');
        ctx.set('Content-Disposition', `attachment;filename=DPE data ${moment().format('YYYY-MM-DD')}.xlsx`);

        ctx.response.body = xlsx.build([{
            name: 'DPE Data',
            data: dpeData
        }, {
            name: 'Mean VAS',
            data: meanVASData
        }, {
            name: 'Mean VAS with Contraction',
            data: meanVASWithContractionData
        }, {
            name: 'Later Mean VAS',
            data: laterMeanVASData
        }]);

    }

    @GetMapping({value: '/dpe/patient/getPatientById/:id'})
    @ApiOperation({value: 'get patient by id', notes: ''})
    static async getPatientById(ctx) {

        const id = ctx.params.id;
        if (!id) {
            return ctx.response.body = Response.buildParamError('Patient ID is required');
        }

        ctx.response.body = await PatientService.getPatientById(id);

    }

    @PostMapping({value: '/dpe/patient/createPatient'})
    @ApiOperation({value: 'create new patient', notes: ''})
    static async createPatient(ctx) {

        const requestData = ctx.request.body;

        let error = PatientController.verifyCreateData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await PatientService.createPatient(requestData);

    }

    @PostMapping({value: '/dpe/patient/updatePatient'})
    @ApiOperation({value: 'update patient', notes: ''})
    static async updatePatient(ctx) {

        const requestData = ctx.request.body;

        let error = PatientController.verifyUpdateData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await PatientService.updatePatient(requestData);

    }

    @PostMapping({value: '/dpe/patient/createOrUpdatePatient'})
    @ApiOperation({value: 'create or update patient', notes: ''})
    static async createOrUpdatePatient(ctx) {

        const requestData = ctx.request.body;

        let error = PatientController.verifyUpdateData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await PatientService.createOrUpdatePatient(requestData);

    }

    @PostMapping({value: '/dpe/patient/enable/:id'})
    @ApiOperation({value: 'enable patient', notes: ''})
    static async enablePatient(ctx) {

        const id = ctx.params.id;
        if (!id) {
            return ctx.response.body = Response.buildParamError('Patient ID is required');
        }

        ctx.response.body = await PatientService.enablePatient(ctx.params.id);

    }

    @PostMapping({value: '/dpe/patient/disable/:id'})
    @ApiOperation({value: 'disable patient', notes: ''})
    static async disablePatient(ctx) {

        const id = ctx.params.id;
        if (!id) {
            return ctx.response.body = Response.buildParamError('Patient ID is required');
        }

        ctx.response.body = await PatientService.disablePatient(id);

    }

};

export default PatientController;
