import Sequelize from 'sequelize';
import AnalgesiaData from '../model/AnalgesiaDataModel.js';

const Op = Sequelize.Op;

async function getById(id) {
    return await AnalgesiaData.findAll({
        where: {
            id: {
                [Op.eq]: id
            }
        }
    });
}

async function getByPatientId(patientId) {
    return await AnalgesiaData.findAll({
        where: {
            patientId: {
                [Op.eq]: patientId
            }
        }
    });
}

async function getByPatientIdAndTimePoint(patientId, TimePoint) {
    return await AnalgesiaData.findAll({
        where: {
            patientId: {
                [Op.eq]: patientId
            },
            TimePoint: {
                [Op.eq]: TimePoint
            }
        }
    });
}

async function add(data) {
    return await AnalgesiaData.create(data);
}

async function update(id, data) {
    return await AnalgesiaData.update(data, {
        where: {
            id: {
                [Op.eq]: id
            }
        }
    });
}

async function updateByPatientIdAndTimePoint(patientId, TimePoint) {
    return await AnalgesiaData.destroy({
        where: {
            patientId: {
                [Op.eq]: patientId
            },
            TimePoint: {
                [Op.eq]: TimePoint
            }
        }
    });
}

export default {

    getById,
    getByPatientId,
    getByPatientIdAndTimePoint,

    add,

    update,

    updateByPatientIdAndTimePoint

};