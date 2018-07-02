'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/showSockets',controller.socket.index);
    router.get('/sendInitCmd', controller.socket.sendInitCmd);

    router.get('/api/trees/getnav', controller.tree.getnav);
    // router.get('/api/stat', controller.common.stat);
    // router.get('/api/realtime/galarm', controller.caution.index);
    router.post('/api/login', controller.user.login);
    router.get('/api/login/loginOut', controller.user.logout);

    // 待添加站
    router.get('/api/sites/newstations', controller.site.newstations);

    // 获取树结构
    router.get('/api/trees/', controller.tree.index);
};
