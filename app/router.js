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
    // 获取用户列表
    router.get('/api_v2/users', controller.user.index);
    // 新增用户
    router.post('/api_v2/users', controller.user.create);
    // 修改用户信息
    router.post('/api_v2/users/update', controller.user.update);
    // 获取单个用户信息
    router.get('/api_v2/users/info', controller.user.uinfo);


    // 站点列表
    router.get('/api_v2/station', controller.station.index);
    // 根据ID获取站详情
    router.get('/api_v2/station_by_id', controller.station.stationById);
    // 新增站点
    router.post('/api_v2/station/add', controller.station.createOrUpdate);
    // 修改站点信息
    router.post('/api_v2/station', controller.station.update);

    // 电池信息列表
    router.get('/api_v2/battery_info', controller.batteryinfo.index);
    router.post('/api_v2/battery_info', controller.batteryinfo.update);
    // UPS信息列表
    router.get('/api_v2/ups_info', controller.upsinfo.index);
    router.post('/api_v2/ups_info', controller.upsinfo.update);

    // 角色列表接口
    router.get('/api_v2/roles', controller.roles.index);

    // 获取bmsinfo列表
    router.get('/api_v2/bmsinfo', controller.bmsinfo.index);
    // 更新bmsinfo
    router.post('/api_v2/bmsinfo', controller.bmsinfo.update);

    // 报警设置相关
    router.get('/api_v2/station_alert_desc', controller.stationAlertDesc.index); // 获取列表
    router.post('/api_v2/station_alert_desc', controller.stationAlertDesc.update); // 更新报警设置
    router.post('/api_v2/station_alert_desc/add', controller.stationAlertDesc.create); // 新增报警设置

    // 参数列表
    router.get('/api_v2/param', controller.param.index); // egg-socket 冲突所以使用这个名字，egg-socket中已经使用了paramter service

    // 获取在线硬站数量
    router.get('/api_v2/connects', controller.station.connects);

    // 获取dashboard的实时数据
    router.get('/api_v2/realtime', controller.station.realtime);

    router.get('/api_v2/history', controller.station.history);

    router.get('/api_v2/realtime/cautions', controller.station.cautions);
};
