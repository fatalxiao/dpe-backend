import AnalgesiaService from '../service/AnalgesiaService.js';
import Response from '../utils/Response.js';
import {Api, ApiOperation, PostMapping, RequestBody} from '../utils/ApiDecorator';

@Api({tags: 'AnalgesiaData'})
class AnalgesiaDataController {

    /**
     * @param ctx
     * @returns {Promise<*>}
     *
     *  requestData: {
     *      patientId: String
     *      analgesiaData: Array
     *  }
     */
    @PostMapping({value: '/dpe/patient/createOrUpdateAnalgesiaData'})
    @ApiOperation({value: 'create new analgesia data', notes: 'create new analgesia data'})
    @RequestBody({value: 'Analgesia'})
    static async createAnalgesiaData(ctx) {

        const requestData = ctx.request.body;
        let error;

        if (!requestData.patientId) {
            error = Response.buildParamError('Patient ID is required');
        } else if (!requestData.analgesiaData) {
            error = Response.buildParamError('Analgesia Data is required');
        }

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
    @PostMapping({value: '/dpe/patient/updateAnalgesiaData'})
    @ApiOperation({value: 'update analgesia data', notes: 'update analgesia data'})
    @RequestBody({value: 'Analgesia'})
    static async updateAnalgesiaData(ctx) {

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

        ctx.response.body = await AnalgesiaService.updateAnalgesiaData(requestData);

    }

};

export default PatientController;