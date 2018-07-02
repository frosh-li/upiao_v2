
const Service = require('egg').Service;

class SiteService extends Service {
    async newstations() {
        const {TbStationModule, MySite} = this.app.model;
        const sites = await this.app.model.query(`select * from tb_station_module where sn_key not in (select serial_number from my_site)`);
        console.log(sites);
        return JSON.parse(JSON.stringify(sites[0]));
    }
}

module.exports = SiteService;
