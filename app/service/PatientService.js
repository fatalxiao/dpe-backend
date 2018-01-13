const userDao = require('../dao/PatientDao.js');

var getUserById = async (userId) => {

    var users = userDao.getUserById(userId);
    var responseContent = '';

    for (let user of users) {
        reaponseContent += '姓名：' + user.name + '&nbsp;|';
        reaponseContent += '年龄：' + user.age + '&nbsp;|';
        reaponseContent += '身高：' + user.height + '<br />';
    }

    return responseContent;

};

module.exports = {
    getUserById: getUserById
};