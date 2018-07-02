'use strict';

const Controller = require('egg').Controller;

class TreeController extends Controller {

    async getnav() {
        const {ctx, app} = this;
        let tree = await ctx.service.tree.findByUser(ctx.session);

        ctx.body = {
            response: {
                code: 0,
                msg: 'ok'
            },
            data: {
                list: tree
            }
        }
    }

    async index() {
        const {ctx, app} = this;
        let tree = await ctx.service.tree.getTreeByUid(ctx.session);
        ctx.body = {
            response: {
                code: 0,
                msg: 'ok'
            },
            data: {
                list: tree
            }
        }
    }
}

module.exports = TreeController;
