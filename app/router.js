'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/showSockets',controller.socket.index);
    router.get('/sendInitCmd', controller.socket.sendInitCmd);
};
