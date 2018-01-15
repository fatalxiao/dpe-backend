const mysql = require('../utils/mysql.js');

async function getPatients() {

    const sql = 'SELECT * FROM patient';

    const result = await mysql.execQuery(sql);

    return result;

}

module.exports = {
    getPatients
};