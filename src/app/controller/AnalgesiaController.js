import AnalgesiaService from '../service/AnalgesiaService.js';
import Response from '../utils/Response.js';
import {Api, ApiOperation, GetMapping, PostMapping, RequestBody} from '../utils/ApiDecorator';

@Api({tags: 'Analgesia'})
class AnalgesiaController {

    static verifyRequestData(patientId, requestData) {

        if (!requestData) {
            return Response.buildParamError('Request Data is required');
        } else if (!patientId) {
            return Response.buildParamError('Patient ID is required');
        } else if (!requestData) {
            return Response.buildParamError('Analgesia Data is required');
        }

        return;

    }

    @GetMapping({value: '/dpe/analgesia/getAnalgesiaDataByPatientId/:patientId'})
    @ApiOperation({value: 'get Analgesia Data by Patient Id', notes: ''})
    static async getAnalgesiaDataByPatientId(ctx) {

        const patientId = ctx.params.patientId;
        if (!patientId) {
            return ctx.response.body = Response.buildParamError('Patient ID is required');
        }

        ctx.response.body = await AnalgesiaService.getAnalgesiaDataByPatientId(patientId);

    }

    /**
     * @param ctx
     * @returns {Promise<*>}
     *
     *  requestData: {
     *      patientId: String
     *      analgesiaData: Array
     *  }
     */
    @PostMapping({value: '/dpe/analgesia/createAnalgesiaData/:patientId'})
    @ApiOperation({value: 'add new analgesia data', notes: ''})
    @RequestBody({value: 'Analgesia'})
    static async createAnalgesiaData(ctx) {

        const patientId = ctx.params.patientId;
        if (!patientId) {
            return ctx.response.body = Response.buildParamError('Patient ID is required');
        }

        const requestData = ctx.request.body;
        let error = AnalgesiaController.verifyRequestData(patientId, requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await AnalgesiaService.createAnalgesiaData(patientId, requestData);

    }

    /**
     * @param ctx
     * @returns {Promise<*>}
     *
     *  requestData: {
     *      patientId: String
     *      analgesiaData: Array
     *  }
     */
    @PostMapping({value: '/dpe/analgesia/updateAnalgesiaData/:patientId'})
    @ApiOperation({value: 'update analgesia data', notes: ''})
    @RequestBody({value: 'Analgesia'})
    static async updateAnalgesiaData(ctx) {

        const patientId = ctx.params.patientId;
        if (!patientId) {
            return ctx.response.body = Response.buildParamError('Patient ID is required');
        }

        const requestData = ctx.request.body;
        let error = AnalgesiaController.verifyRequestData(patientId, requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await AnalgesiaService.updateAnalgesiaData(patientId, requestData);

    }

    /**
     * @param ctx
     * @returns {Promise<*>}
     *
     *  requestData: {
     *      patientId: String
     *      analgesiaData: Array
     *  }
     */
    @PostMapping({value: '/dpe/analgesia/createOrUpdateAnalgesiaData/:patientId'})
    @ApiOperation({value: 'add or update analgesia data', notes: ''})
    @RequestBody({value: 'Analgesia'})
    static async createOrUpdateAnalgesiaData(ctx) {

        const patientId = ctx.params.patientId;
        if (!patientId) {
            return ctx.response.body = Response.buildParamError('Patient ID is required');
        }

        const requestData = ctx.request.body;
        let error = AnalgesiaController.verifyRequestData(patientId, requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await AnalgesiaService.createOrUpdateAnalgesiaData(patientId, requestData);

    }

};

export default AnalgesiaController;