'use strict';

const Controller = require('egg').Controller;

class TreeController extends Controller {

    parseNode(tree, pid, level) {
        let ret = [];

        tree.forEach(node => {
            if(node.pid === pid) {
                ret.push({
                    title: node.title,
                    key: 'node-'+node.id,
                    children: this.parseNode(tree, node.id, ++level),
                    value: node.id.toString(),
                })
            }
        });

        return ret;
    }

    async getnav() {
        const {ctx, app} = this;
        let tree = await ctx.service.tree.findByUser(ctx.session);
        tree = JSON.parse(JSON.stringify(tree));
        let outTree = [];

        // 获取根节点
        tree.forEach(node => {
            if(node.pid === 0){
                outTree.push({
                    title: node.title,
                    key: 'node-'+node.id,
                    value: node.id.toString(),
                    children: this.parseNode(tree, node.id, 1),
                })
                return;
            }
        });

        ctx.body = {
            status: true,
            data: {
                list: outTree
            }
        }
    }

    async index() {
        const {ctx, app} = this;
        let tree = await ctx.service.tree.getTreeByUid(ctx.session);
        let outTree = [];
        tree = JSON.parse(JSON.stringify(tree));
        // 获取根节点
        tree.forEach(node => {
            if(node.pid === 0){
                outTree.push({
                    title: node.title,
                    key: 'node-'+node.id,
                    children: this.parseNode(tree, node.id, 1),
                    value: node.id.toString(),
                })
                return;
            }
        });

        ctx.body = {
            status: true,
            data: {
                list: outTree
            }
        }
    }

    /**
     * 修改树结构
     */
    async saveTreeNode() {
        const {ctx, app} = this;
        let {key, value} = ctx.request.body;

        if(!key || !value) {
            ctx.body = {
                status: false,
            }
            return;
        }

        await ctx.service.tree.update(+key.replace('node-',''), value);

        ctx.body = {
            status: true,
        }
    }

    /**
     * 新增树结构
     */
    async addTreeNode() {
        const {ctx, app} = this;
        let {parentKey, value} = ctx.request.body;
        // console.log(parentKey,value);
        if(!parentKey || !value) {
            ctx.body = {
                status: false,
            }
            return;
        }
        await ctx.service.tree.create(+parentKey, value);
        ctx.body = {
            status: true,
        }
    }

    /**
     * 删除树结构
     */
    async removeTreeNode() {
        const {ctx, app} = this;
        let {key} = ctx.request.body;
        if(key.indexOf('new') > -1){
            ctx.body = {
                status: true,
            };
            return;
        }
        await ctx.service.tree.delete(+key.replace('node-',''));
        // console.log(key);
        ctx.body = {
            status: true,
        }
    }
}

module.exports = TreeController;
