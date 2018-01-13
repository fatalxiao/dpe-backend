const userService = require('./../service/userService.js');

var getUserinfo = (ctx, next) => {
    let query = ctx.query;
    let userId = query.id;
    let userInfo = userService.getUserById(userId);

    let html = '<html><body>'
        + '<div> userinfo:&nbsp;' + userInfo + '</div>'
        + '</body></html>';
    ctx.response.type ='text/html';
    ctx.response.body = html;
};

var saveUserinfo = (ctx, next) => {
    const requestString = ctx.data;
    //TODO数据处理
    Console.log(requestString);
};

module.exports = {
    'GET /getUserinfo': getUserinfo,
    'POST /saveUserinfo': saveUserinfo
};