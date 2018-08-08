'use strict';

const Controller = require('egg').Controller;

class SiteController extends Controller {

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
        let createSite = await ctx.service.site.createOrUpdate(ctx.request.body);
        if(createSite && createSite.length === 2 && createSite[0].id > 0){
            // 创建成功
            ctx.body = {
                response: {
                    code: 0,
                    msg:'ok',
                    data: {
                        id: createSite[0].id,
                        sid: ctx.request.body.sid,
                        site_name: ctx.request.body.site_name,
                    }
                }
            }
        }else{
            // 创建失败
            ctx.body = {
                response: {
                    code: -1,
                    msg: '操作失败'
                }
            }
        }
    }

    async index() {
        let pageSize = 10;
        const {ctx, app} = this;
        let ids = ctx.request.body.id.split(",");
        let page=ctx.request.body.page || 1;
        ids.forEach((item,index) => {
            ids[index] = item*10000;
        })
        let sites = await ctx.service.site.findById(ids,page,pageSize);
        ctx.body = {
            response: {
                code: 0,
                msg:"ok",
            },
            data: {
                list: sites.rows,
                page: page,
                pageSize:pageSize
            }
        }
    }
}

module.exports = SiteController;
