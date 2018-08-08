const Subscription = require('egg').Subscription;
const moment = require('moment');

class ClearData extends Subscription {
    static get schedule() {

        return {
            interval: '30s',
            type: 'worker'
        }
    }

    async subscribe() {
        const {app, logger} = this;
        // const {TbStationModule, TbGroupModule, TbBatteryModule, MyAlerts} = this.app.model;
        // // 清理一分钟前的数据
        // let clear_time = moment().add(-1, 'minutes').local().format('YYYY-MM-DD HH:mm:ss');
        // logger.info(`清理${clear_time}之前的历史数据`);
        // await Promise.all([
        //     TbStationModule.destroy({
        //         where: {
        //             record_time: {
        //                 $lt: clear_time
        //             }
        //         }
        //     }),
        //     TbGroupModule.destroy({
        //         where: {
        //             record_time: {
        //                 $lt: clear_time
        //             }
        //         }
        //     }),
        //     TbBatteryModule.destroy({
        //         where: {
        //             record_time: {
        //                 $lt: clear_time
        //             }
        //         }
        //     }),
        //     MyAlerts.destroy({
        //         where: {
        //             time: {
        //                 $lt: clear_time
        //             }
        //         }
        //     }),
        //     app.model.query(`delete from systemalarm where station not in (select serial_number from my_site)`), // 清理系统报警
        // ]);

    }
}

module.exports = ClearData;
