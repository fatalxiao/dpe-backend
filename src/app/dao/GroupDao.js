const mysql = require('../utils/mysql.js');

async function getGroups() {

    const sql =
        `SELECT
        id,
        group_name AS groupName
        FROM dpe_group`;

    const result = await mysql.execQuery(sql);

    return result;

}

module.exports = {
    getGroups
};