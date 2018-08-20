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

    async update() {
        const {ctx, app} = this;
        try{
            console.log(ctx.request.body);
            let createSite = await ctx.service.site.update(ctx.request.body);
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

        const {ctx, app} = this;

        let search_key = ctx.query.search_key; //  模糊搜索，同时匹配名称 sid 和 fullname
        let aid = ctx.query.aid || ""; // 搜索区域检索
        let pageSize = +ctx.query.pageSize || 20;
        let page= +ctx.query.page || 1;

        let sites = await ctx.service.site.filter(search_key, aid ,page ,pageSize);

        ctx.body = {
            status: true,
            data: {
                list: sites.rows,
                page: page,
                pageSize:pageSize,
                totals: sites.count,
            }
        }
    }

    async stationById() {
        const {ctx, app} = this;
        let id = ctx.query.id;
        let data = await ctx.service.site.stationById(id);

        data = JSON.parse(JSON.stringify(data));
        console.log(data);
        let ret = {
            //station: data,
            upsinfo: Object.assign({},data.ups_info),
            batteryinfo: Object.assign({},data.battery_info),
        };
        delete data.ups_info;
        delete data.battery_info;
        ret.station = Object.assign({},data);

        ctx.body = {
            status: true,
            data: ret
        }
    }

    // 获取连接站数和站总数,报警数等
    async connects() {
        const {ctx, app} = this;
        let data = await ctx.service.site.getCounts(ctx.session);
        console.log(data);
        ctx.body = {
            status: true,
            data: data,
        }
    }

    async realtime() {
        const {ctx, app} = this;
        let data = await ctx.service.site.getRealtime(ctx.session);
        console.log(data);
        ctx.body = {
            status: true,
            data: data,
        }
    }
}

module.exports = StationController;
