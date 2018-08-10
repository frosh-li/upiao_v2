'use strict';

const Controller = require('egg').Controller;

class StationController extends Controller {

    async newstations() {
        const {ctx, app} = this;
        let site = await ctx.service.site.newstations();
        console.log(site);
        if(site){
            ctx.body = {
                response: {
                    code: 0,
                    msg: 'ok'
                },
                data:{
                    list: site
                }
            }
        }else{
            ctx.body = {
                response: {
                    code: 0,
                    msg: 'ok',
                    data: {
                        list: []
                    }
                }
            }
        }
    }

    async createOrUpdate() {
        const {ctx, app} = this;
        try{
            console.log(ctx.request.body);
            let createSite = await ctx.service.site.createOrUpdate(ctx.request.body);
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

    async index() {
        let pageSize = 10;
        const {ctx, app} = this;
        let search_key = ctx.query.search_key; //  模糊搜索，同时匹配名称 sid 和 fullname
        let aid = ctx.query.aid || ""; // 搜索区域检索

        let page=ctx.query.page || 1;

        let sites = await ctx.service.site.filter(search_key, aid ,page ,pageSize);

        ctx.body = {
            status: true,
            data: {
                list: sites.rows,
                page: page,
                pageSize:pageSize
            }
        }
    }
}

module.exports = StationController;