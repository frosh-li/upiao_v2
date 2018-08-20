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
        let extime = 300;
        await Promise.all([
            (async()=>{
                let key = `realtime:station:${sn_key}`;
                let realtime_station_data = await app.redis.get(key);
                let newData = JSON.parse(realtime_station_data);
                newData.record_time = record_time;
                await app.redis.setex(key, extime, JSON.stringify(newData));
            })(),
            (async()=>{
                let key = `realtime:group:${sn_key}`;
                let realtime_station_data = await app.redis.get(key);
                let newData = JSON.parse(realtime_station_data);
                let outData = newData.map((item) => {
                    item.record_time = record_time;
                    return item;
                })

                await app.redis.setex(key, extime, JSON.stringify(outData));
            })(),
            (async()=>{
                let key = `realtime:battery:${sn_key}`;
                let realtime_station_data = await app.redis.get(key);
                let newData = JSON.parse(realtime_station_data);
                let outData = newData.map((item) => {
                    item.record_time = record_time;
                    return item;
                })

                await app.redis.setex(key, extime, JSON.stringify(outData));
            })()
        ]);
    }
}

module.exports = HeatbeatService;
