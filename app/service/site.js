
const Service = require('egg').Service;

class SiteService extends Service {
    async newstations() {
        const {TbStationModule, MySite} = this.app.model;
        const sites = await this.app.model.query(`select * from tb_station_module where sn_key not in (select serial_number from my_site)`);
        console.log(sites);
        return JSON.parse(JSON.stringify(sites[0]));
    }

    /**
     * 新建站点
     * 1.校验密码
     */
    async createOrUpdate(obj) {
        const {Station, UpsInfo, BatteryInfo} = this.app.model;
        return this.app.model.transaction((t) => {
            return Promise.all([
                Station.create(obj.station, {transaction: t}),

                UpsInfo.create(Object.assign(obj.ups_info,{
                    sn_key: obj.station.sn_key,
                    create_time: new Date(),
                    update_time: new Date(),
                }), {transaction: t}),

                BatteryInfo.create(Object.assign(obj.battery_info,{
                    sn_key: obj.station.sn_key,
                    create_time: new Date(),
                    update_time: new Date(),
                }),{transaction: t})
            ])
        })
    }

    async update(obj) {
        const {Station} = this.app.model;
        return Station.update(obj, {
            where: {
                sn_key: obj.sn_key
            }
        })
    }

    async findById(ids, page, limit) {
        const {MySite} = this.app.model;
        let where = {};
        if(ids.length > 0){
            where.serial_number = {
                '$in':ids
            }
        }
        let res = await MySite.findAndCountAll({
            where: where,
            limit: limit,
            offset: (page-1)*limit
        });

        return res;
    }

    async stationById(id)  {
        const {Station, UpsInfo, BatteryInfo} = this.app.model;
        Station.belongsTo(UpsInfo, {foreignKey: 'sn_key', targetKey: 'sn_key'});
        Station.belongsTo(BatteryInfo, {foreignKey: 'sn_key', targetKey: 'sn_key'});
        let data = Station.findOne({
            include: [
                {
                    model: UpsInfo,

                },{
                    model: BatteryInfo,

                }
            ],
            where: {
                '$or': [
                    {
                        id: id,
                    },
                    {
                        sn_key: id
                    }
                ]

            }
        });
        console.log(data);
        return data;
    }

    /**
     * 列表页面获取站点列表
     */
    async filter(search_key="", areaid="", page=1, limit=20) {
        const {Station, Tree} = this.app.model;
        Station.belongsTo(Tree, {foreignKey:'aid', targetKey: 'id'})
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

        let res = await Station.findAndCountAll({
            where: where,
            limit: limit,
            offset: (page-1)*limit,
            include: [
                {
                    model: Tree,
                }
            ]
        });

        return res;

    }
}

module.exports = SiteService;
