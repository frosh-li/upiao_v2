'use strict';

const Controller = require('egg').Controller;

class RolesController extends Controller {

    async index() {
        const {ctx, app, logger} = this;
        let roles = await ctx.service.role.findAll();

        ctx.body = {
            status: true,
            data: {
                list: roles
            }
        }
    }
}

module.exports = RolesController;
