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

    async index() {
        const {ctx} = this;
        let page=ctx.query.page || 1;

        let data = await ctx.service.user.findAllByUser(ctx.session, 20*(page-1), 20);
        console.log(data);
        ctx.body = {
            status: true,
            data: {
                list: data.rows,
                totals: data.count,
                page: page,
                pageSize: 20
            }
        }
    }

    /**
     * 新建用户
     */
    async create() {
        const {ctx} = this;
        let params = ctx.request.body;

        try{
            let result = await ctx.service.user.create(params);
            ctx.body = {
                status: true,
                msg: '新建用户成功',
            }
        }catch(e){
            ctx.body = {
                status: false,
                msg: `创建失败${e.message}`
            }
        }
    }

    /**
     * 修改用户信息
     */
    async update() {
        const {ctx} = this;
        let params = ctx.request.body;

        try{
            let result = await ctx.service.user.update(params);
            ctx.body = {
                status: true,
                msg: '修改用户成功',
            }
        }catch(e){
            ctx.body = {
                status: false,
                msg: `修改用户信息失败${e.message}`
            }
        }
    }

    /**
     * 获取单个用户信息
     */
    async uinfo(){
        const {ctx} = this;
        let uid = ctx.query.id;

        try{
            let data = await ctx.service.user.findUserById(uid);
            ctx.body = {
                status: true,
                msg: '获取用户成功',
                data: data
            }
        }catch(e){
            ctx.body = {
                status: false,
                msg: `获取用户信息失败${e.message}`
            }
        }
    }

}

module.exports = UserController;
