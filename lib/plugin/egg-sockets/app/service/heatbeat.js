const Service = require('egg').Service;
const moment = require('moment');

class HeatbeatService extends Service {
    /**
     * 心跳包格式
     * <{"sn_key":22222222220000,"sid":222}>
     * 收到心跳包之后更新实时数据的时间即可
     */
    async parser(str, socket) {
        const {logger, app, ctx} = this;
        let sn_key = str.sn_key;
        let record_time = moment().format('YYYY-MM-DD HH:mm:ss');
        let extime = app.config.sockets.client.expired;
        let aid = app.areamap[sn_key];
        if(!aid) {
            return;
        }
        let key = `realtime:station:${aid}:${sn_key}`;
        let realtime_station_data = await app.redis.get(key);
        if(!realtime_station_data) {
            // 没有数据请求一次
            await ctx.service.socketData.init(socket);
            return;
        }
        let newData = JSON.parse(realtime_station_data);
        newData.record_time = record_time;
        await app.redis.setex(key, extime, JSON.stringify(newData));

    }
}

module.exports = HeatbeatService;
