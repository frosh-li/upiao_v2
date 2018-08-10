
const Service = require('egg').Service;

class BatteryinfoService extends Service {

    /**
     * 列表页面获取站点列表
     */
    async filter(search_key="", areaid="", page=1, limit=20) {
        const {Station, Tree, BatteryInfo} = this.app.model;
        Station.belongsTo(Tree, {foreignKey:'aid', targetKey: 'id'});
        BatteryInfo.belongsTo(Station, {foreignKey: 'sn_key', targetKey: 'sn_key'});
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

        let res = await BatteryInfo.findAndCountAll({
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
}

module.exports = BatteryinfoService;