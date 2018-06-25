const Service = require('egg').Service;
const moment = require('moment');

class HeatbeatService extends Service {
    /**
     * 心跳包格式
     * <{"sn_key":22222222220000,"sid":222}>
     * 收到心跳包之后更新实时数据的时间即可
     */
    async parser(str) {
        const {logger, app} = this;
        let sn_key = str.sn_key;
        let record_time = moment().format('YYYY-MM-DD HH:mm:ss');
        let realtables = ['tb_station_module', 'tb_group_module', 'tb_battery_module'];
        let promises = [];
        realtables.forEach(table => {
            promises.push(app.model.query(`update ${table} set record_time="${record_time}" where floor(sn_key/10000)=${Math.floor(sn_key/10000)}`));
        })
        await Promise.all(promises);
    }
}

module.exports = HeatbeatService;
