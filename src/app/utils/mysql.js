// const mysql = require('mysql'),
//     config = require('../../config.js'),
//
//     connectionPool = mysql.createPool({
//         ...config.database,
//         'supportBigNumbers': true,
//         'bigNumberStrings': true
//     });
//
// function release(connection) {
//     connection.end(error => {
//         if (error) {
//             console.log('Connection closed failed.');
//         } else {
//             console.log('Connection closed succeeded.');
//         }
//     });
// };
//
// function execQuery(sql) {
//
//     return new Promise((resolve, reject) => {
//
//         connectionPool.getConnection((error, connection) => {
//
//             if (error) {
//                 console.log('Get connection from mysql pool failed !');
//                 throw error;
//             }
//
//             connection.query(sql, (error, results) => {
//
//                 if (error) {
//                     console.log('Execute query error !');
//                     throw error;
//                 }
//
//                 console.log(sql, '\n', results);
//
//                 resolve(results);
//
//             });
//
//             connection.release(error => {
//                 if (error) {
//                     console.log('Mysql connection close failed !');
//                     throw error;
//                 }
//             });
//
//         });
//
//     }).then(chunk => {
//         return chunk;
//     });
//
// };
//
// module.exports = {
//     release,
//     execQuery
// };