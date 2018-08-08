
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
        const {MySite} = this.app.model;
        // site_chname没有使用到，后期从数据表中删除
        obj.site_chname = obj.StationFullChineseName;
        obj.aid = obj.area;

        let res = await MySite.findOrCreate({
            where: {
                serial_number: obj.serial_number
            },
            defaults: obj
        });
        return res;
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
}

module.exports = SiteService;
