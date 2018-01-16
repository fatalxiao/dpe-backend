const mysql = require('../utils/mysql.js');

async function getGroups() {

    const sql =
        `SELECT
        id,
        group_name AS groupName
        FROM dpe_group`;

    return await mysql.execQuery(sql);

}

module.exports = {
    getGroups
};