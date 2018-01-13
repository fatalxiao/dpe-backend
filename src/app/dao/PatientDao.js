const mysql = require('../utils/mysql.js');

async function getPatients() {

    const sql = 'select * from patient';

    return await mysql.execQuery(sql);

}

module.exports = {
    getPatients
};