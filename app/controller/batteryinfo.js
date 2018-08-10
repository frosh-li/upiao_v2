'use strict';

const Controller = require('egg').Controller;

class BatteryinfoController extends Controller {

    async index() {
        let pageSize = 20;
        const {ctx, app} = this;
        let search_key = ctx.query.search_key; //  模糊搜索，同时匹配名称 sid 和 fullname
        let aid = ctx.query.aid || ""; // 搜索区域检索

        let page=ctx.query.page || 1;

        let data = await ctx.service.batteryinfo.filter(search_key, aid ,page ,pageSize);

        ctx.body = {
            status: true,
            data: {
                list: data.rows,
                page: page,
                pageSize:pageSize
            }
        }
    }
}

module.exports = BatteryinfoController;
