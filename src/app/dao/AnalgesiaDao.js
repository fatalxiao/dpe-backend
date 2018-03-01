import Sequelize from 'sequelize';

import Analgesia from '../model/AnalgesiaModel';
import SensoryBlock from '../model/SensoryBlockModel';

async function getAnalgesiaDataByPatientId(patientId) {
    return await Analgesia.findAll({
        where: {
            patientId: {[Sequelize.Op.eq]: patientId}
        },
        include: [{
            model: SensoryBlock,
            as: 'thoracicSensoryBlockLeft',
            where: {sensoryBlockValue: Sequelize.col('analgesia_data.thoracic_sensory_block_left_value')}
        }, {
            model: SensoryBlock,
            as: 'thoracicSensoryBlockRight',
            where: {sensoryBlockValue: Sequelize.col('analgesia_data.thoracic_sensory_block_right_value')}
        }, {
            model: SensoryBlock,
            as: 'sacralSensoryBlockLeft',
            where: {sensoryBlockValue: Sequelize.col('analgesia_data.sacral_sensory_block_left_value')}
        }, {
            model: SensoryBlock,
            as: 'sacralSensoryBlockRight',
            where: {sensoryBlockValue: Sequelize.col('analgesia_data.sacral_sensory_block_right_value')}
        }]
    });
}

async function isAnalgesiaDataExist(patientId, timePoint) {
    return await Analgesia.count({
        where: {
            patientId: {[Sequelize.Op.eq]: patientId},
            timePoint: {[Sequelize.Op.eq]: timePoint}
        }
    }) > 0;
}

async function createAnalgesiaData(data) {
    return await Analgesia.create(data);
}

async function updateAnalgesiaData(data) {
    return await Analgesia.update(data, {
        where: {
            patientId: {[Sequelize.Op.eq]: data.patientId},
            timePoint: {[Sequelize.Op.eq]: data.timePoint}
        }
    });
}

async function createOrUpdateAnalgesiaData(data) {
    if (await isAnalgesiaDataExist(data.patientId, data.timePoint)) {
        return updateAnalgesiaData(data);
    } else {
        return createAnalgesiaData(data);
    }
}

export default {

    getAnalgesiaDataByPatientId,

    isAnalgesiaDataExist,

    createAnalgesiaData,
    updateAnalgesiaData,
    createOrUpdateAnalgesiaData

};