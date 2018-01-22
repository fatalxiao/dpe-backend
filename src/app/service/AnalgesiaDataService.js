import AnalgesiaDataDao from '../dao/AnalgesiaDataDao.js';
import Response from '../utils/Response.js';

async function updateAnalgesiaData(formData) {

    try {

        const {patientId, analgesiaData} = formData;

        for (let item of analgesiaData) {

            const data = await AnalgesiaDataDao.getByPatientIdAndTimePoint(patientId, item.timePoint);

            if (data.length > 0) {
                AnalgesiaDataDao.update(data[0].id, item);
            } else {
                AnalgesiaDataDao.add(item);
            }

        }

        return Response.buildSuccess(null);

    } catch (e) {
        return Response.buildError(e);
    }

};

export default {
    updateAnalgesiaData
};