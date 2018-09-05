const Subscription = require('egg').Subscription;
const moment = require('moment');
/**
 * 定期清理排行版redis数据
 */
class ClearData extends Subscription {
    static get schedule() {

        return {
            interval: '30s',
            type: 'worker'
        }
    }

    async subscribe() {
        const {app, logger} = this;
        let areas = Object.values(app.areamap);

        // lifetime:rank:84
        // capacity:rank:84
        // cautionrank:84
        let onlineKeys = await app.redis.keys("realtime:station:*"); // 在线的站点的一个列表

        let onlineSnKeys = new Set([]);

        onlineKeys.forEach(item => {
            onlineSnKeys.add(item.replace(/realtime:station:[0-9]+:/,''));
        })


        areas.forEach(async (area) => {
            // 删除寿命排行
            let sn_keys = await app.redis.zrange(`lifetime:rank:${area}`,0,-1);
            let delkeys = [];
            sn_keys && sn_keys.forEach(sn_key => {
                if(!onlineSnKeys.has(sn_key)) {
                    // 如果不在里面就删除
                    delkeys.push(sn_key);
                }
            })
            if(delkeys.length > 0){
                await app.redis.zrem(`lifetime:rank:${area}`,...delkeys);
            }

            // 删除容量徘行
            sn_keys = await app.redis.zrange(`capacity:rank:${area}`,0,-1);
            delkeys = [];
            sn_keys && sn_keys.forEach(sn_key => {
                if(!onlineSnKeys.has(sn_key)) {
                    // 如果不在里面就删除
                    delkeys.push(sn_key);
                }
            })
            if(delkeys.length > 0){
                await app.redis.zrem(`capacity:rank:${area}`,...delkeys);
            }

            // 删除报警的rank
            sn_keys = await app.redis.zrange(`cautionrank:${area}`,0,-1);
            delkeys = [];
            sn_keys && sn_keys.forEach(sn_key => {
                if(!onlineSnKeys.has(sn_key)) {
                    // 如果不在里面就删除
                    delkeys.push(sn_key);
                }
            })
            if(delkeys.length > 0){
                await app.redis.zrem(`cautionrank:${area}`,...delkeys);
            }

        })
    }
}

module.exports = ClearData;
