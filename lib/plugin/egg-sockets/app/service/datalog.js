const Service = require('egg').Service;
const moment = require('moment');

class DatalogService extends Service {
    async addLog(sn_key, msg) {

        const {logger, app} = this;
        const {MyRunningLog} = app.model;

        logger.info(msg);
        let modify_time = moment().utcOffset(-8);
        await MyRunningLog.create({
            sid: sn_key,
            content: msg,
            modify_time: modify_time
        })
    }
}

module.exports = DatalogService;
