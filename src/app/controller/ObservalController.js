import ObservalService from '../service/ObservalService.js';
import Response from '../utils/Response.js';
import {Api, ApiOperation, PostMapping, RequestBody} from '../utils/ApiDecorator';

@Api({tags: 'Observal'})
class ObservalController {

    static verifyRequestData(requestData) {

        if (!requestData) {
            return Response.buildParamError('Request Data is required');
        } else if (!requestData.patientId) {
            return Response.buildParamError('Patient ID is required');
        } else if (!requestData.observalData) {
            return Response.buildParamError('Observal Data is required');
        }

        return;

    }

    @PostMapping({value: '/dpe/observal/createObservalData'})
    @ApiOperation({value: 'add new observal data', notes: 'add new observal data'})
    @RequestBody({value: 'Observal'})
    static async createObservalData(ctx) {

        const requestData = ctx.request.body;

        let error = ObservalController.verifyRequestData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await ObservalService.createObservalData(requestData);

    }

    @PostMapping({value: '/dpe/observal/updateObservalData'})
    @ApiOperation({value: 'update observal data', notes: 'update observal data'})
    @RequestBody({value: 'Observal'})
    static async updateObservalData(ctx) {

        const requestData = ctx.request.body;

        let error = ObservalController.verifyRequestData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await ObservalService.updateObservalData(requestData);

    }

    @PostMapping({value: '/dpe/observal/createOrUpdateObservalData'})
    @ApiOperation({value: 'add or update observal data', notes: 'add or update observal data'})
    @RequestBody({value: 'Observal'})
    static async createOrUpdateObservalData(ctx) {

        const requestData = ctx.request.body;

        let error = ObservalController.verifyRequestData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await ObservalService.createOrUpdateObservalData(requestData);

    }

};

export default ObservalController;