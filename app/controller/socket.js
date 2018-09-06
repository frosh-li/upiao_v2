'use strict';

const Controller = require('egg').Controller;

class SocketController extends Controller {
    async index() {
        const {ctx, app} = this;
        let sockets = await app.showSockets();
        // ctx.logger.info('all sockets', sockets);
        ctx.body = Array.from(sockets);
    }

    async sendInitCmd() {
        const {ctx, app} = this;
        const sn_key = ctx.query.sn_key;
        let socket = await app.sendInitCmd(sn_key);

        ctx.body = {
            status: 200,
            msg: '发送结束'
        };
    }
}

module.exports = SocketController;
