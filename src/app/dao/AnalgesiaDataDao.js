const AnalgesiaData = require('../model/AnalgesiaDataModel');

async function addAnalgesiaData(data) {
    return await AnalgesiaData.bulkCreate(data);
}

module.exports = {
    addAnalgesiaData
};