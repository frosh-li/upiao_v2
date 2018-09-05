const Service = require('egg').Service;
const moment = require('moment');

/**
 * 日志逻辑
 * 整个日志存一条记录
 * 加入时间戳
 * 加入红橙黄警情条数
 *
 * 插入报警排行榜
 *
 * 1小时插入一次警情
 */
class CautionService extends Service {

    constructor(ctx) {
        super(ctx);
        this.RED=0;
        this.ORANGE=0;
        this.YELLOW=0;
    }

    buildBulk(sn_key, record_time, error_type, eData) {
        let {app} = this;
        let ret = [];
        for(let key in eData.errors) {
            if(key.startsWith('Limit')) {
                continue;
            }
            let level = key.split("_");
            level = level.length == 2 ? level[1] : "";
            if(level === "R") {
                this.RED++;
            }
            if(level === "O") {
                this.ORANGE++;
            }
            if(level === "Y") {
                this.YELLOW++;
            }

            ret.push({
                code: key,
                current: eData.errors[key],
                level: level,
                climit: eData.limits[`Limit_${key}`] || 0,
                gid: eData.gid,
                bid: eData.bid,
            })
        }
        return ret;
    }

    async parser(data) {

        this.RED=0;
        this.ORANGE=0;
        this.YELLOW=0;

        const {app, logger} = this;

        let record_time = moment().format('YYYY-MM-DD HH:mm:ss');

        let sn_key = data.StationErr.sn_key;

        if(!app.areamap[sn_key]){
            return;
        }


        let errorBulks = {
            sn_key: sn_key,
            record_time: record_time,
            red: 0,
            yellow: 0,
            orange: 0,
            aid: app.areamap[sn_key],
            station: [],
            group: [],
            battery: [],
        };

        if(data.StationErr) {
            // 如果没有对应的区域不进行操作
            errorBulks.station = this.buildBulk(sn_key, record_time, 'station', data.StationErr);
        }

        if(data.GroupErr) {
            let GroupErrs = data.GroupErr;

            GroupErrs.forEach(GroupErr => {
                errorBulks.group = errorBulks.group.concat(this.buildBulk(sn_key, record_time, 'group', GroupErr));
            })
        }

        if(data.BatteryErr) {
            let BatteryErrs = data.BatteryErr;

            BatteryErrs.forEach(BatteryErr => {
                errorBulks.battery = errorBulks.battery.concat(this.buildBulk(sn_key, record_time, 'battery', BatteryErr));
            })
        }
        let totalCaution = errorBulks.station.length + errorBulks.group.length + errorBulks.battery.length;
        logger.info(`站${sn_key}总报警条数为`, totalCaution);

        let insertHistory = false;
        let now = +new Date();
        let lastHistory = app.getLastCautionBySnKey(sn_key) || 0;

        logger.info(`${sn_key}当前时间${now}:${lastHistory}`)

        console.log("RED",this.RED, "ORANGE",this.ORANGE, "YELLOW", this.YELLOW);
        errorBulks.red = this.RED;
        errorBulks.yellow = this.YELLOW;
        errorBulks.orange = this.ORANGE;

        if(now - lastHistory > app.config.sockets.client.insertCautionInterval && totalCaution > 0){
            insertHistory = true;
            logger.info(`${sn_key}需要插入历史`);
            logger.info(errorBulks)
            this.app.mongo.db.collection('caution').insert(errorBulks);
            app.updateLastCautionBySnKey(sn_key);
        }

        // 先清理之前的报警数据，并插入最新的报警数据
        // zadd caution:list 10 11111111 // 站有10条报警

        await Promise.all([
            this.app.redis.setex(`caution:${app.areamap[sn_key]}:${sn_key}`,app.config.sockets.client.expired, JSON.stringify(errorBulks)),
            this.app.redis.zadd(`cautionrank:${app.areamap[sn_key]}`, this.RED*100000000+this.ORANGE*10000+this.YELLOW, sn_key),
        ]);
    }
}

module.exports = CautionService;
