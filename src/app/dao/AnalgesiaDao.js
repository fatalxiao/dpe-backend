import Sequelize from 'sequelize';

import PatientModel from '../model/PatientModel.js';
import AnalgesiaDataModel from '../model/AnalgesiaDataModel.js';
import ObservalDataModel from '../model/ObservalDataModel.js';

async function isAnalgesiaDataExist(patientId, timePoint) {
    return await AnalgesiaDataModel.count({
        where: {
            patientId: {[Sequelize.Op.eq]: patientId},
            timePoint: {[Sequelize.Op.eq]: timePoint}
        }
    }) > 0;
}

async function createOrUpdateAnalgesiaData(data) {
    for (let item of data) {
        if (await isAnalgesiaDataExist(item.patientId, item.timePoint)) {
            await AnalgesiaDataModel.update(item, {
                where: {
                    patientId: {[Sequelize.Op.eq]: item.patientId},
                    timePoint: {[Sequelize.Op.eq]: item.timePoint}
                }
            });
        } else {
            await AnalgesiaDataModel.create(item);
        }
    }
    return;
}

export default {

    getPatients,

    isPatientInfomationExist,
    createOrUpdatePatientInfomation

    // isAnalgesiaDataExist,
    // createOrUpdateAnalgesiaData,
    //
    // isObservalDataExist,
    // createOrUpdateObservalData

};