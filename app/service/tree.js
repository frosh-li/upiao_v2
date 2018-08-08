
const Service = require('egg').Service;

class TreeService extends Service {
    /**
     * 创建树节点
     */
    async create(parentId=0, title) {
        const {Tree} = this.app.model;
        return await Tree.create({
            pid: parentId,
            title: title,
        });
    }

    /**
     * 更新树节点
     */
    async update(id=0, title='') {
        const {Tree} = this.app.model;
        return await Tree.update({
            title: title,
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

        const {Tree} = this.app.model;
        if(id <= 0){
            return null;
        }
        return await Tree.destroy({
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
        const {Tree} = this.app.model;
        let where = {};
        if(user.manage_station !== "*"){
            let areaid = user.manage_station.split(',');
            where['id'] = {
                '$in' : areaid
            };
        }

        let trees = await Tree.findAll({
            where: where,
        });

        return trees;
    }

    async findByUser(user, history=0) {
        const {Tree, Station} = this.app.model;
        console.log('session user', user);
        let where = {};
        let site_where = {
            is_checked : 1,
        };
        if(user.manage_station !== "*") {
            let areaid = user.manage_station.split(',');
            where['id'] = {
                '$in' : areaid
            };
            site_where['aid'] = {
                '$in': areaid
            }
        }
        const trees = await Tree.findAll({
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
        const sites = await Station.findAll({
            where: site_where,
            attributes: ['sn_key', 'aid', 'site_name', 'sid']
        });

        let sn_keys = [];

        JSON.parse(JSON.stringify(sites)).forEach(item => {
            if(item.length === 0){
                return;
            }
            list.push({
                id: item.sn_key.substring(0, 10),
                pid: item.aid,
                title: `${item.site_name}-${item.sid}`,
                is_checked: 1,
                leveltype: 2,
            });
            sn_keys.push(item.sn_key);
        });

        const groups = await this.app.model.query(`select gid, sid, sn_key from tb_group_module where floor(sn_key/10000)*10000 in (${sn_keys.join(",")})`);

        JSON.parse(JSON.stringify(groups[0])).forEach(item => {
            if(item.length === 0){
                return;
            }
            let citem = item;
            //console.log('item data', citem);
            list.push({
                id: citem.sn_key.toString().substring(0,12),
                pid: citem.sn_key.toString().substring(0,10),
                title: `组${citem.sn_key.toString().substring(10,12)}`,
                leveltype: 3,
            });
        });

        const batterys = await this.app.model.query(`select bid, sid, sn_key from tb_battery_module where floor(sn_key/10000)*10000 in (${sn_keys.join(",")})`);

        JSON.parse(JSON.stringify(batterys[0])).forEach(item => {
            //console.log(item);
            if(item.length === 0){
                return;
            }
            let citem = item;
            //console.log('item data', citem);
            list.push({
                id: citem.sn_key.toString(),
                pid: citem.sn_key.toString().substring(0,12),
                title: `电池${citem.sn_key.toString().substring(12,14)}`,
                leveltype: 4,
            });
        });

        //console.log(list);
        return list;
    }
}

module.exports = TreeService;
