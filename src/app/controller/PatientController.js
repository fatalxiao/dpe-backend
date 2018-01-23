import _ from 'lodash';
import PatientService from '../service/PatientService.js';
import AnalgesiaDataService from '../service/AnalgesiaDataService.js';
import Response from '../utils/Response.js';
import {GetMapping, PostMapping} from '../utils/ApiDecorator';

export default class PatientController {

    @GetMapping({route: '/dpe/patient/getPatients'})
    static async getPatients(ctx) {
        ctx.response.body = await PatientService.getPatients();
    }

    @PostMapping({route: '/dpe/patient/addPatient'})
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

    @PostMapping({route: '/dpe/patient/updateAnalgesiaData'})
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