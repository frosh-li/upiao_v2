const Service = require('egg').Service;
const moment = require('moment');

const column = {

}

class StationService extends Service {
    /**
     * 写入站的实时和历史数据表
     */
    async parserStation(data) {
        const {logger, app} = this;
        let record_time = moment().format('YYYY-MM-DD HH:mm:ss');
        let sn_key = data.StationData.sn_key;
        let aid = app.areamap[sn_key];
        if(!aid) {
            // 无隶属区域的数据不保存
            return;
        }
        let obj = {
			record_time:record_time,
            sn_key: sn_key,
            aid: aid,
			station: data.StationData,
            group: data.GroupData,
            battery: data.BatteryData,
		};

        // 添加实时数据进redis中，并且设置1分钟自动过期
        // mongo+redis的数据记录
        // 增加寿命和容量排行
        await Promise.all([
            app.redis.setex(`realtime:station:${aid}:${sn_key}`, app.config.sockets.client.expired, JSON.stringify(obj)),
            app.mongo.db.collection('station_data').insert(obj),
            app.redis.zadd(`lifetime:rank:${app.areamap[sn_key]}`, data.StationData.Lifetime || 100, sn_key),
            app.redis.zadd(`capacity:rank:${app.areamap[sn_key]}`, data.StationData.Capacity || 100, sn_key),
        ])




        logger.info("站数据写入完成", sn_key);
    }

    async parser(data) {
        await this.parserStation(data);
    }
}

module.exports = StationService;
