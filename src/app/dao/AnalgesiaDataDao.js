const AnalgesiaData = require('../model/AnalgesiaDataModel');

async function getById(id) {
    return await AnalgesiaData.findAll({
        where: {
            id
        }
    });
}

async function getByPatientId(patientId) {
    return await AnalgesiaData.findAll({
        where: {
            patientId
        }
    });
}

async function getByPatientIdAndTimePoint(patientId, TimePoint) {
    return await AnalgesiaData.findAll({
        where: {
            patientId,
            TimePoint
        }
    });
}

async function add(data) {
    return await AnalgesiaData.create(data);
}

async function update(id, data) {
    return await AnalgesiaData.update(data, {
        where: {
            id
        }
    });
}

async function updateByPatientIdAndTimePoint(patientId, TimePoint) {
    return await AnalgesiaData.destroy({
        where: {
            patientId,
            TimePoint
        }
    });
}

module.exports = {

    getById,
    getByPatientId,
    getByPatientIdAndTimePoint,

    add,

    update,

    updateByPatientIdAndTimePoint

};