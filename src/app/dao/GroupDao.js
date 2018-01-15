const mysql = require('../utils/mysql.js');

async function getGroups() {

    const sql = 'SELECT * FROM dpe_group';

    const result = await mysql.execQuery(sql);

    return result;

}

module.exports = {
    getGroups
};