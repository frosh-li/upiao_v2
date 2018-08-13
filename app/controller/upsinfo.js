'use strict';

const Controller = require('egg').Controller;

class UpsinfoController extends Controller {

    async index() {
        let pageSize = 20;
        const {ctx, app} = this;
        let search_key = ctx.query.search_key; //  模糊搜索，同时匹配名称 sid 和 fullname
        let aid = ctx.query.aid || ""; // 搜索区域检索

        let page=ctx.query.page || 1;

        let data = await ctx.service.upsinfo.filter(search_key, aid ,page ,pageSize);

        ctx.body = {
            status: true,
            data: {
                list: data.rows,
                page: page,
                pageSize:pageSize
            }
        }
    }

    async update() {
        const {ctx, app} = this;
        try{
            console.log(ctx.request.body);
            let updateups = await ctx.service.upsinfo.update(ctx.request.body);
            ctx.body = {
                status: true,
            }
        }catch(e) {
            console.log(e);
            // 创建失败
            ctx.body = {
                status:false,
                msg: e.message,
            }
        }
    }
}

module.exports = UpsinfoController;
