import ObservalService from '../service/ObservalService.js';
import Response from '../utils/Response.js';
import {Api, ApiOperation, GetMapping, PostMapping, RequestBody} from '../utils/ApiDecorator';

@Api({tags: 'Observal'})
class ObservalController {

    static verifyRequestData(patientId, requestData) {

        if (!requestData) {
            return Response.buildParamError('Request Data is required');
        } else if (!patientId) {
            return Response.buildParamError('Patient ID is required');
        } else if (!requestData) {
            return Response.buildParamError('Observal Data is required');
        }

        return;

    }

    @GetMapping({value: '/dpe/observal/getObservalDataByPatientId/:patientId'})
    @ApiOperation({value: 'get Observal Data by Patient Id', notes: ''})
    static async getObservalDataByPatientId(ctx) {

        const patientId = ctx.params.patientId;
        if (!patientId) {
            return ctx.response.body = Response.buildParamError('Patient ID is required');
        }

        ctx.response.body = await ObservalService.getObservalDataByPatientId(patientId);

    }

    @PostMapping({value: '/dpe/observal/createObservalData/:patientId'})
    @ApiOperation({value: 'add new observal data', notes: 'add new observal data'})
    @RequestBody({value: 'Observal'})
    static async createObservalData(ctx) {

        const patientId = ctx.params.patientId;
        if (!patientId) {
            return ctx.response.body = Response.buildParamError('Patient ID is required');
        }

        const requestData = ctx.request.body;
        let error = ObservalController.verifyRequestData(patientId, requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await ObservalService.createObservalData(patientId, requestData);

    }

    @PostMapping({value: '/dpe/observal/updateObservalData/:patientId'})
    @ApiOperation({value: 'update observal data', notes: 'update observal data'})
    @RequestBody({value: 'Observal'})
    static async updateObservalData(ctx) {

        const patientId = ctx.params.patientId;
        if (!patientId) {
            return ctx.response.body = Response.buildParamError('Patient ID is required');
        }

        const requestData = ctx.request.body;
        let error = ObservalController.verifyRequestData(patientId, requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await ObservalService.updateObservalData(patientId, requestData);

    }

    @PostMapping({value: '/dpe/observal/createOrUpdateObservalData/:patientId'})
    @ApiOperation({value: 'add or update observal data', notes: 'add or update observal data'})
    @RequestBody({value: 'Observal'})
    static async createOrUpdateObservalData(ctx) {

        const patientId = ctx.params.patientId;
        if (!patientId) {
            return ctx.response.body = Response.buildParamError('Patient ID is required');
        }

        const requestData = ctx.request.body;
        let error = ObservalController.verifyRequestData(patientId, requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await ObservalService.createOrUpdateObservalData(patientId, requestData);

    }

};

export default ObservalController;