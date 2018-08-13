
const Service = require('egg').Service;

class UpsinfoService extends Service {

    /**
     * 列表页面获取站点列表
     */
    async filter(search_key="", areaid="", page=1, limit=20) {
        const {Station, Tree, UpsInfo} = this.app.model;
        Station.belongsTo(Tree, {foreignKey:'aid', targetKey: 'id'});
        UpsInfo.belongsTo(Station, {foreignKey: 'sn_key', targetKey: 'sn_key'});
        let where = {};
        if(search_key) {
            where = {
                '$or': [
                    {
                        station_name: {
                            '$like':`%${search_key}%`,
                        },
                    },
                    {
                        station_full_name:{
                            '$like':`%${search_key}%`,
                        },
                    },
                    {
                        sid: search_key
                    }
                ]
            }
        }

        if(areaid) {
            where.aid = {
                '$in': areaid.split(",")
            }
        }

        let res = await UpsInfo.findAndCountAll({
            limit: limit,
            offset: (page-1)*limit,
            include: [
                {
                    model: Station,
                    attributes: ['station_name', 'sid'],
                    where: where,
                    include: [
                        {
                            model: Tree
                        }
                    ]
                }
            ]
        });

        return res;

    }

    async update(obj) {
        const {UpsInfo} = this.app.model;
        return UpsInfo.update(obj, {
            where: {
                sn_key: obj.sn_key
            }
        })
    }
}

module.exports = UpsinfoService;
