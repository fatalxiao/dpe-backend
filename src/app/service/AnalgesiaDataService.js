const AnalgesiaDataDao = require('../dao/AnalgesiaDataDao.js'),
    Response = require('../utils/Response.js');

async function updateAnalgesiaData(formData) {

    const {patientId, analgesiaData} = formData;

    for (let item of analgesiaData) {

    }

    return Response.buildSuccess(await AnalgesiaDataDao.addAnalgesiaData(formData));

};

module.exports = {
    updateAnalgesiaData
};