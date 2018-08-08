const Service = require('egg').Service;
const moment = require('moment');

class CautionService extends Service {
    buildBulk(sn_key, record_time, error_type, eData) {
        let ret = [];
        for(let key in eData.errors) {
            if(key.startsWith('Limit')) {
                continue;
            }
            ret.push({
                type: error_type,
                sn_key: eData.sn_key,
                code: key,
                current: eData.errors[key],
                time: record_time,
                climit: eData.limits[`Limit_${key}`] || 0,
            })
        }
        return ret;
    }

    async parser(data) {
        const {app, logger} = this;
        const {MyAlerts, MyAlertsHistory} = this.app.model;
        let record_time = moment().format('YYYY-MM-DD HH:mm:ss');
        let errorBulks = [];
        let sn_key = '';
        if(data.StationErr) {
            sn_key = data.StationErr.sn_key;
            errorBulks = errorBulks.concat(this.buildBulk(sn_key, record_time, 'station', data.StationErr));
        }

        if(data.GroupErr) {
            let GroupErrs = data.GroupErr;
            GroupErrs.forEach(GroupErr => {
                errorBulks = errorBulks.concat(this.buildBulk(GroupErr.sn_key.substring(0,10)+'0000', record_time, 'group', GroupErr));
            })
        }

        if(data.BatteryErr) {
            let BatteryErrs = data.BatteryErr;
            BatteryErrs.forEach(BatteryErr => {
                errorBulks = errorBulks.concat(this.buildBulk(BatteryErr.sn_key.substring(0,10)+'0000', record_time, 'battery', BatteryErr));
            })
        }
        let totalCaution = errorBulks.length;
        logger.info(`站${sn_key}总报警条数为`, totalCaution);
        // if(totalCaution <= 0){
        //     return;
        // }

        let insertHistory = false;
        let now = +new Date();
        let lastHistory = app.getLastCautionBySnKey(sn_key) || 0;

        logger.info(`${sn_key}当前时间${now}:${lastHistory}`)

        if(now - lastHistory > app.config.sockets.client.insertCautionInterval && totalCaution > 0){
            insertHistory = true;
            logger.info(`${sn_key}需要插入历史`);
            logger.info(errorBulks)
            this.app.mongo.db.collection('caution').insertMany(errorBulks);
            app.updateLastCautionBySnKey(sn_key);
        }

        // 先清理之前的报警数据，并插入最新的报警数据
        await this.app.redis.setex(`caution:${Math.floor(sn_key/10000)}`,300, JSON.stringify(errorBulks))
    }
}

module.exports = CautionService;
