'use strict';

const Controller = require('egg').Controller;

class BmsinfoController extends Controller {

    async index() {
        const {ctx, app, logger} = this;
        let bmsinfo = await ctx.service.bmsinfo.findAll();

        ctx.body = {
            status: true,
            data: bmsinfo
        }
    }

    async update() {
        const { ctx, app, logger} = this;
        try{
            let bms = await ctx.service.bmsinfo.update(ctx.request.body);
            ctx.body = {
                status: true,
                msg: '更新bms厂家信息成功'
            }
        }catch(e) {
            ctx.body = {
                status: false,
                msg: `更新bms厂家信息失败${e.message}`
            }
        }



    }
}

module.exports = BmsinfoController;
