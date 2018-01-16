const mysql = require('../utils/mysql.js');

async function getSensoryBlocks() {

    const sql =
        `SELECT
        id, 
        sensory_block_name AS sensoryBlockName,
        sensory_block_value AS sensoryBlockValue
        FROM sensory_block`;

    const result = await mysql.execQuery(sql);

    return result;

}

module.exports = {
    getSensoryBlocks
};