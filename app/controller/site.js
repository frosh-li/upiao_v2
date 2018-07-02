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
}

module.exports = SiteController;
