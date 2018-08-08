const Service = require('egg').Service;
const moment = require('moment');

class DatalogService extends Service {
    async addLog(sn_key, msg) {

        const {logger, app} = this;

        logger.info(msg);
        let modify_time = moment().format('YYYY-MM-DD HH:mm:ss');;
        await this.app.mongo.db.collection('running_log').insertOne({
            sn_key: sn_key,
            content: msg,
            modify_time: modify_time
        });
    }
}

module.exports = DatalogService;
