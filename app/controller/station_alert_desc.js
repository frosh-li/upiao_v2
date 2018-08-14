'use strict';

const Controller = require('egg').Controller;

class StationAlertDescController extends Controller {

    async index() {
        const {ctx, app, logger} = this;
        let data = await ctx.service.stationAlertDesc.findAll();

        ctx.body = {
            status: true,
            data: {
                list: data.rows,
                totals: data.count
            }
        }
    }

    async update() {
        const {ctx, app, logger} = this;
        try{
            let data = await ctx.service.stationAlertDesc.update(ctx.request.body);

            ctx.body = {
                status: true,
            }
        }catch(e){
            ctx.body = {
                status: false,
                msg: `更新失败${e.message}`
            }
        }

    }

    async create() {
        const {ctx, app, logger} = this;
        try{
            let data = await ctx.service.stationAlertDesc.create(ctx.request.body);

            ctx.body = {
                status: true,
            }
        }catch(e){
            ctx.body = {
                status: false,
                msg: `更新失败${e.message}`
            }
        }

    }


}

module.exports = StationAlertDescController;
