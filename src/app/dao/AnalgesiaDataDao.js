const AnalgesiaData = require('../model/AnalgesiaDataModel');

async function getAnalgesiaDataById(id) {
    return await AnalgesiaData.findAll({
        where: {
            id
        }
    });
}

async function getAnalgesiaDataByPatientId(patientId) {
    return await AnalgesiaData.findAll({
        where: {
            patientId
        }
    });
}

async function getAnalgesiaDataByPatientIdAndTimePoint(patientId, TimePoint) {
    return await AnalgesiaData.findAll({
        where: {
            patientId,
            TimePoint
        }
    });
}

async function addAnalgesiaData(data) {
    return await AnalgesiaData.create(data);
}

async function updateAnalgesiaData(id, data) {
    return await AnalgesiaData.update(data, {
        where: {
            id
        }
    });
}

module.exports = {
    getAnalgesiaDataById,
    getAnalgesiaDataByPatientId,
    getAnalgesiaDataByPatientIdAndTimePoint,
    addAnalgesiaData,
    updateAnalgesiaData
};