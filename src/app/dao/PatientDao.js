const mysql = require('../utils/mysql.js');

async function getPatients() {

    const sql = 'select * from patient';

    const result = await mysql.execQuery(sql);

    return result;

}

module.exports = {
    getPatients
};