'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    router.get('/', controller.home.index);
    router.get('/showSockets',controller.socket.index);
    router.get('/sendInitCmd', controller.socket.sendInitCmd);


    // router.get('/api/stat', controller.common.stat);
    // router.get('/api/realtime/galarm', controller.caution.index);
    router.post('/api_v2/login/account', controller.user.login);
    router.post('/api_v2/loginOut/account', controller.user.logout);

    //router.use('*', controller.user.verify);
    router.get('/api/trees/getnav', controller.tree.getnav);

    // 待添加站
    router.get('/api/sites/newstations', controller.station.newstations);

    // 获取树结构
    router.get('/api_v2/trees/', controller.tree.index);
    // 修改树结构
    router.post('/api_v2/trees/', controller.tree.saveTreeNode);
    // 删除树结构
    router.post('/api_v2/trees/remove', controller.tree.removeTreeNode);
    // 新增树结构
    router.post('/api_v2/trees/add', controller.tree.addTreeNode);

    // 获取用户信息
    router.get('/api_v2/currentUser', controller.user.currentUser);

    // 站点列表
    router.get('/api_v2/station', controller.station.index);
    // 新增站点
    router.post('/api_v2/station/add', controller.station.createOrUpdate);
    // 修改站点信息
    router.post('/api_v2/station', controller.station.createOrUpdate);

    // 电池信息列表
    router.get('/api_v2/battery_info', controller.batteryinfo.index);

    // UPS信息列表
    router.get('/api_v2/ups_info', controller.upsinfo.index);
};
