'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

    async login() {
        const {ctx, app, logger} = this;
        const {phone, password} = ctx.request.body;
        let user = await ctx.service.user.find(phone, password);
        logger.info('user info ', user)
        if(user){
            ctx.session = JSON.parse(JSON.stringify(user));
            ctx.body = {
                status: 'ok',
                type:0,
                currentAuthority: user.role === 1 ? 'admin' : (user.role === 2 ? 'user':'guest'),
              }
        }else{
            ctx.body = {
                status: 'error',
                type: 0,
                currentAuthority: 'guest',
            }
        }
    }

    async logout() {
        const {ctx} = this;
        ctx.session = null;
        ctx.body = {
            status: true
        }
    }

    async currentUser() {
        const {ctx} = this;
        ctx.body = {
            status: true,
            data: {
                username: ctx.session.username,
                phone: ctx.session.phone,
                gender: ctx.session.gender,
                role: ctx.session.role,
                refresh: ctx.session.refresh,
                unit: ctx.session.unit,
                ismanage: ctx.session.ismanage,
                email:ctx.session.email,
                duty:ctx.session.duty,
                postname: ctx.session.postname,
            }
        };
    }

}

module.exports = UserController;
