
const Service = require('egg').Service;

class ParamService extends Service {
    async findAll(search_key="", areaid="", ctype = 'station', page=1, limit=20) {
        const {BatteryParam, StationParam, GroupParam, Station, Tree} = this.app.model;

        Station.belongsTo(Tree, {foreignKey:'aid', targetKey: 'id'});
        BatteryParam.belongsTo(Station, {foreignKey: 'sn_key', targetKey: 'sn_key'});
        GroupParam.belongsTo(Station, {foreignKey: 'sn_key', targetKey: 'sn_key'});
        StationParam.belongsTo(Station, {foreignKey: 'sn_key', targetKey: 'sn_key'});

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

        let include = [
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

        if(ctype === 'station') {
            const data = await StationParam.findAndCountAll({
                where: where,
                offset: (page-1)*limit,
                limit: limit,
                include: include
            });
            return data;
        }else if(ctype === 'group'){
            const data = await GroupParam.findAndCountAll({
                where: where,
                offset: (page-1)*limit,
                limit: limit,
                include: include
            });
            return data;
        }else if(ctype === 'battery'){
            const data = await BatteryParam.findAndCountAll({
                where: where,
                offset: (page-1)*limit,
                limit: limit,
                include: include
            });
            return data;
        }

    }
}

module.exports = ParamService;
