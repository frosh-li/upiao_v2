'use strict';

const Controller = require('egg').Controller;

class ParamController extends Controller {

    async index() {
        let pageSize = 20;
        const {ctx, app} = this;
        let search_key = ctx.query.search_key; //  模糊搜索，同时匹配名称 sid 和 fullname
        let aid = ctx.query.aid || ""; // 搜索区域检索

        let page=ctx.query.page || 1;

        let ctype = ctx.query.ctype ; // 站、组、电池

        let data = await ctx.service.param.findAll(search_key, aid, ctype ,page ,pageSize);

        ctx.body = {
            status: true,
            data: {
                list: data.rows,
                totals: data.count,
                page: page,
                pageSize:pageSize
            }
        }
    }

    async update() {
        ctx.body = {
            status: true,
        }
    }
}

module.exports = ParamController;
