const mysql = require('../utils/mysql.js');

async function getGroups() {

    const sql = 'select * from group';

    const result = await mysql.execQuery(sql);

    return result;

}

module.exports = {
    getGroups
};