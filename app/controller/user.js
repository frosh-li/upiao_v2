'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {

    async login() {
        const {ctx, app} = this;
        const {username, password} = ctx.request.body;
        let user = await ctx.service.user.find(username, password);
        if(user){
            ctx.session = JSON.parse(JSON.stringify(user));
            ctx.body = {
                response: {
                    code: 0,
                    msg: 'ok'
                },
                data: user
            }
        }else{
            ctx.body = {
                response: {
                    code: -1,
                    msg: '用户名密码错误',
                }
            }
        }
    }

    async logout() {
        const {ctx} = this;
        ctx.session = null;
        ctx.body = {
            response: {
                code: 0,
                msg: 'ok',
            }
        }
    }
}

module.exports = UserController;
