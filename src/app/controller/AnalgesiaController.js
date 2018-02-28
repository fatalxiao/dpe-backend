import AnalgesiaService from '../service/AnalgesiaService.js';
import Response from '../utils/Response.js';
import {Api, ApiOperation, PostMapping, RequestBody} from '../utils/ApiDecorator';

@Api({tags: 'Analgesia'})
class AnalgesiaController {

    static verifyRequestData(requestData) {

        if (!requestData) {
            return Response.buildParamError('Request Data is required');
        } else if (!requestData.patientId) {
            return Response.buildParamError('Patient ID is required');
        } else if (!requestData.analgesiaData) {
            return Response.buildParamError('Analgesia Data is required');
        }

        return;

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
    @PostMapping({value: '/dpe/analgesia/createAnalgesiaData'})
    @ApiOperation({value: 'add new analgesia data', notes: 'add new analgesia data'})
    @RequestBody({value: 'Analgesia'})
    static async createAnalgesiaData(ctx) {

        const requestData = ctx.request.body;

        let error = AnalgesiaController.verifyRequestData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await AnalgesiaService.createAnalgesiaData(requestData);

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
    @PostMapping({value: '/dpe/analgesia/updateAnalgesiaData'})
    @ApiOperation({value: 'update analgesia data', notes: 'update analgesia data'})
    @RequestBody({value: 'Analgesia'})
    static async updateAnalgesiaData(ctx) {

        const requestData = ctx.request.body;

        let error = AnalgesiaController.verifyRequestData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await AnalgesiaService.updateAnalgesiaData(requestData);

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
    @PostMapping({value: '/dpe/analgesia/createOrUpdateAnalgesiaData'})
    @ApiOperation({value: 'add or update analgesia data', notes: 'add or update analgesia data'})
    @RequestBody({value: 'Analgesia'})
    static async createOrUpdateAnalgesiaData(ctx) {

        const requestData = ctx.request.body;

        console.log(requestData);

        let error = AnalgesiaController.verifyRequestData(requestData);
        if (error) {
            return ctx.response.body = error;
        }

        ctx.response.body = await AnalgesiaService.createOrUpdateAnalgesiaData(requestData);

    }

};

export default AnalgesiaController;