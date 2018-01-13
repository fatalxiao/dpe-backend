const mysql = require('./../utils/mysqlUtil.js');

var getUserById = async (userId) => {
    let mysqlOptions = {
        sql : 'select * from table_user where user_id = ?',
        args : [userId]
    };

    var users = await mysql.execQuery(mysqlOptions);
    if(users.length == 0) {
        return null;
    } else {
        return users;
    }
};

module.exports = {
    getUserById : getUserById
};