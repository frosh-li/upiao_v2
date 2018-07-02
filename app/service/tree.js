
const Service = require('egg').Service;

class TreeService extends Service {
    /**
     * 创建树节点
     */
    async create(parentId=0, title) {
        const {MyTrees} = this.app.model;
        return await MyTrees.create({
            ishidden: 0,
            pid: parentId,
            content: title,
            title: title,
        });
    }

    /**
     * 更新树节点
     */
    async update(id=0, pid=0, title='') {
        const {MyTrees} = this.app.model;
        return await MyTrees.update({
            title: title,
            content: title,
            pid: pid,
        }, {
            where: {
                id: id,
            }
        })
    }

    /**
     * 删除节点
     */
    async delete(id = -1){

        const {MyTrees} = this.app.model;
        if(id <= 0){
            return null;
        }
        return await MyTrees.destroy({
            where: {
                id: id,
            },
            force: true,
        })
    }

    /**
     * 根据用户获取树结构
     */
    async getTreeByUid(user) {
        const {MyTrees} = this.app.model;
        let where = {};
        if(user.area !== "*"){
            let areaid = user.area.split(',');
            where['id'] = {
                '$in' : areaid
            };
        }

        let trees = await MyTrees.findAll({
            where: where,
        });

        return trees;
    }

    async findByUser(user, history=0) {
        const {MyTrees, MySite, TbGroupModule, TbBatteryModule} = this.app.model;
        //MyTrees.belongsTo(MySite, {foreignKey:'id', targetKey:'aid'})
        console.log('session user', user);
        let where = {};
        let site_where = {
            is_checked : 1,
        };
        if(user.area !== "*") {
            let areaid = user.area.split(',');
            where['id'] = {
                '$in' : areaid
            };
            site_where['aid'] = {
                '$in': areaid
            }
        }
        const trees = await MyTrees.findAll({
            where: where,
        });
        const list = [];
        let treeids = [];
        JSON.parse(JSON.stringify(trees)).forEach(item => {
            if(item.length === 0){
                return;
            }
            item.leveltype = 1;
            list.push(item);
            treeids.push(item.id);
        });
        site_where.aid = {
            '$in': treeids
        };
        const sites = await MySite.findAll({
            where: site_where,
            attributes: ['serial_number', 'aid', 'site_name', 'sid']
        });

        let sn_keys = [];

        JSON.parse(JSON.stringify(sites)).forEach(item => {
            if(item.length === 0){
                return;
            }
            list.push({
                id: item.serial_number.substring(0, 10),
                pid: item.aid,
                title: `${item.site_name}-${item.sid}`,
                is_checked: 1,
                leveltype: 2,
            });
            sn_keys.push(item.serial_number);
        });

        const groups = await this.app.model.query(`select gid, sid, sn_key from tb_group_module where floor(sn_key/10000) in (${sn_keys.join(",")})`);

        JSON.parse(JSON.stringify(groups)).forEach(item => {
            if(item.length === 0){
                return;
            }
            console.log('item data', item);
            list.push({
                id: item.sn_key.toString().substring(0,12),
                pid: item.sn_key.toString().substring(0,10),
                title: `组${gid}`,
                leveltype: 3,
            });
        });

        console.log(list);
        return list;
    }
}

module.exports = TreeService;
