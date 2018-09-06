
const Service = require('egg').Service;
const ObjectID = require('mongodb').ObjectID;

class SiteService extends Service {
    async newstations() {
        const {TbStationModule, MySite} = this.app.model;
        const sites = await this.app.model.query(`select * from tb_station_module where sn_key not in (select serial_number from my_site)`);
        console.log(sites);
        return JSON.parse(JSON.stringify(sites[0]));
    }

    /**
     * 新建站点
     * 1.校验密码
     */
    async createOrUpdate(obj) {
        const {Station, UpsInfo, BatteryInfo} = this.app.model;
        return this.app.model.transaction((t) => {
            return Promise.all([
                Station.create(obj.station, {transaction: t}),

                UpsInfo.create(Object.assign(obj.ups_info,{
                    sn_key: obj.station.sn_key,
                    create_time: new Date(),
                    update_time: new Date(),
                }), {transaction: t}),

                BatteryInfo.create(Object.assign(obj.battery_info,{
                    sn_key: obj.station.sn_key,
                    create_time: new Date(),
                    update_time: new Date(),
                }),{transaction: t})
            ])
        })
    }


    /**
     * async update - 更新站数据
     *
     * @param  {type} obj description
     * @return {type}     description
     */
    async update(obj) {
        const {Station} = this.app.model;
        return Station.update(obj, {
            where: {
                sn_key: obj.sn_key
            }
        })
    }

    /**
     * 获取站详情，根据站ID或者sn_key
     */
    async stationById(id)  {
        const {Station, UpsInfo, BatteryInfo} = this.app.model;
        Station.belongsTo(UpsInfo, {foreignKey: 'sn_key', targetKey: 'sn_key'});
        Station.belongsTo(BatteryInfo, {foreignKey: 'sn_key', targetKey: 'sn_key'});
        let data = Station.findOne({
            include: [
                {
                    model: UpsInfo,

                },{
                    model: BatteryInfo,

                }
            ],
            where: {
                '$or': [
                    {
                        id: id,
                    },
                    {
                        sn_key: id
                    }
                ]

            }
        });
        // console.log(data);
        return data;
    }


    /**
     * async getCounts - 获取在线和离线站点数  获取总报警数量
     *
     * @param  {type} user description
     * @return {type}      description
     */
    async getCounts(user) {
        const {Station, Tree} = this.app.model;
        Station.belongsTo(Tree, {foreignKey:'aid', targetKey: 'id'})
        let where = {};

        if(user.manage_station !== "*") {
            where.aid = {
                '$in': user.manage_station.split(",")
            }
        }

        let totalStations = await Station.findAndCountAll(
            {
                where: where,
                attributes: ['sn_key'],
            }
        ); // 获取总站数


        let onlineKeys = [];
        let totalCautionKeys = [];
        let _totalStations = JSON.parse(JSON.stringify(totalStations));
        if(user.manage_station !== "*") {
            user.manage_station.split(',').forEach(item => {
                onlineKeys.push(`realtime:station:${this.app.areamap[item]}:${item}`);
                totalCautionKeys.push(`caution:${this.app.areamap[item]}:${item}`);
            })
        }else{
            onlineKeys = await this.app.redis.keys(`realtime:station:*`);
            totalCautionKeys = await this.app.redis.keys(`caution:*`);
        }

        if(!onlineKeys || onlineKeys.length <= 0 || !totalCautionKeys || totalCautionKeys.length <= 0){
            return {
                totalStations: _totalStations.count,
                onlineStations: 0,
                cautions: 0,
                caution_R: 0,
                caution_Y: 0,
                caution_O: 0,
            }
        }

        let redisData = await Promise.all([
            this.app.redis.exists(onlineKeys),
            this.app.redis.mget(totalCautionKeys),
        ]);
        let cautionCounts = 0;

        let caution_R = 0;
        let caution_Y = 0;
        let caution_O = 0;

        if(redisData[1]){
            let data = redisData[1];
            data.forEach(item => {
                if(!item){
                    return;
                }
                try {
                     let data = JSON.parse(item);
                     cautionCounts = cautionCounts + data.red + data.yellow + data.orange;
                     caution_R += data.red;
                     caution_Y += data.yellow;
                     caution_O += data.orange;
                }catch(e){
                    console.log(e.message);
                }
            })
        }

        return {
            totalStations: _totalStations.count,
            onlineStations: redisData[0],
            cautions: cautionCounts,
            caution_R: caution_R,
            caution_Y: caution_Y,
            caution_O: caution_O,
        }
    }


    /**
     * async getRealtime - 获取当前报警最严重的10个站 规则根据红橙黄来判断重要度
     *
     * @param  {type} user description
     * @return {type}      description
     */
    async getRealtime(user) {
        let temprank = "TEMPRANK";
        const {Station, Tree} = this.app.model;
        Station.belongsTo(Tree, {foreignKey:'aid', targetKey: 'id'})
        let where = {};

        if(user.manage_station !== "*") {
            where.aid = {
                '$in': user.manage_station.split(",")
            }
        }

        let totalStations = await Station.findAndCountAll(
            {
                where: where,
                attributes: ['sn_key', 'station_name'],
            }
        ); // 获取总站数

        //console.log('totalStations', totalStations);

        let onlineKeys = [];
        let totalCautionKeys = [];
        let station_map = {};
        let _totalStations = JSON.parse(JSON.stringify(totalStations));
        _totalStations.rows.forEach(item => {
            station_map[item.sn_key] = item;

        });
        let top10 = null;
        if(user.manage_station !== "*") {
            user.manage_station.split(',').forEach(item => {
                // onlineKeys.push(`realtime:station:${item}:*`);
                totalCautionKeys.push(`cautionrank:${item}`);
            })
            // 合并数组
            await this.app.redis.zunionstore(temprank,totalCautionKeys.length, ...totalCautionKeys);
            top10 = await this.app.redis.zrevrange(temprank, 0, 9, 'withscores');

        }else{
            // onlineKeys.push(`realtime:station:*`);
            totalCautionKeys = `cautionrank:*`;
            let rankkeys = await this.app.redis.keys(totalCautionKeys);
            if(!rankkeys || rankkeys.length === 0) {
                return [];
            }
            await this.app.redis.zunionstore(temprank,rankkeys.length, ...rankkeys);
            top10 = await this.app.redis.zrevrange(temprank, 0, 9, 'withscores');
        }


        let ret = [];
        if(top10){
            let data = top10;

            data.forEach((item, index) => {
                if(index%2==0){
                    let red = Math.floor(data[index+1]/100000000);
                    let orange = Math.floor(data[index+1]%100000000/10000);
                    let yellow = data[index+1] % 10000;
                    ret.push({
                        sn_key: item,
                        red: red,
                        orange: orange,
                        yellow: yellow,
                        station_name: station_map[item]['station_name']
                    })
                }

            })
        }
        // console.log(ret);
        return ret;
    }


    /**
     * async lifetime - 获取寿命最短的10个站
     *
     * @param  {type} user description
     * @return {type}      description
     */
    async lifetime(user) {
        let temprank = "TEMPRANK:LIFETIME";
        const {Station, Tree} = this.app.model;
        Station.belongsTo(Tree, {foreignKey:'aid', targetKey: 'id'})
        let where = {};

        if(user.manage_station !== "*") {
            where.aid = {
                '$in': user.manage_station.split(",")
            }
        }

        let totalStations = await Station.findAndCountAll(
            {
                where: where,
                attributes: ['sn_key', 'station_name'],
            }
        ); // 获取总站数

        // console.log('totalStations', totalStations);

        let onlineKeys = [];
        let totalCautionKeys = [];
        let station_map = {};
        let _totalStations = JSON.parse(JSON.stringify(totalStations));
        _totalStations.rows.forEach(item => {
            station_map[item.sn_key] = item;

        });
        let top10 = null;
        if(user.manage_station !== "*") {
            user.manage_station.split(',').forEach(item => {
                // onlineKeys.push(`realtime:station:${item}:*`);
                totalCautionKeys.push(`lifetime:rank:${item}`);
            })
            // 合并数组
            await this.app.redis.zunionstore(temprank,totalCautionKeys.length, ...totalCautionKeys);
            top10 = await this.app.redis.zrange(temprank, 0, 9, 'withscores');

        }else{
            // onlineKeys.push(`realtime:station:*`);
            totalCautionKeys = `lifetime:rank:*`;
            let rankkeys = await this.app.redis.keys(totalCautionKeys);
            if(!rankkeys || rankkeys.length === 0) {
                return [];
            }
            await this.app.redis.zunionstore(temprank,rankkeys.length, ...rankkeys);
            top10 = await this.app.redis.zrange(temprank, 0, 9, 'withscores');
        }


        let ret = [];
        if(top10){
            let data = top10;

            data.forEach((item, index) => {
                if(index%2==0){

                    ret.push({
                        sn_key: item,
                        val: data[index+1],
                        station_name: station_map[item]['station_name']
                    })
                }

            })
        }
        // console.log(ret);
        return ret;
    }


    /**
     * async capacity - 获取容量最短的10个站
     *
     * @param  {type} user description
     * @return {type}      description
     */
    async capacity(user) {
        let temprank = "TEMPRANK:CAPACITY";
        const {Station, Tree} = this.app.model;
        Station.belongsTo(Tree, {foreignKey:'aid', targetKey: 'id'})
        let where = {};

        if(user.manage_station !== "*") {
            where.aid = {
                '$in': user.manage_station.split(",")
            }
        }

        let totalStations = await Station.findAndCountAll(
            {
                where: where,
                attributes: ['sn_key', 'station_name'],
            }
        ); // 获取总站数

        // console.log('totalStations', totalStations);

        let onlineKeys = [];
        let totalCautionKeys = [];
        let station_map = {};
        let _totalStations = JSON.parse(JSON.stringify(totalStations));
        _totalStations.rows.forEach(item => {
            station_map[item.sn_key] = item;

        });
        let top10 = null;
        if(user.manage_station !== "*") {
            user.manage_station.split(',').forEach(item => {
                // onlineKeys.push(`realtime:station:${item}:*`);
                totalCautionKeys.push(`capacity:rank:${item}`);
            })
            // 合并数组
            await this.app.redis.zunionstore(temprank,totalCautionKeys.length, ...totalCautionKeys);
            top10 = await this.app.redis.zrange(temprank, 0, 9, 'withscores');

        }else{
            // onlineKeys.push(`realtime:station:*`);
            totalCautionKeys = `capacity:rank:*`;
            let rankkeys = await this.app.redis.keys(totalCautionKeys);
            if(!rankkeys || rankkeys.length === 0) {
                return [];
            }
            await this.app.redis.zunionstore(temprank,rankkeys.length, ...rankkeys);
            top10 = await this.app.redis.zrange(temprank, 0, 9, 'withscores');
        }


        let ret = [];
        if(top10){
            let data = top10;

            data.forEach((item, index) => {
                if(index%2==0){
                    ret.push({
                        sn_key: item,
                        val: data[index+1],
                        station_name: station_map[item]['station_name']
                    })
                }

            })
        }
        // console.log(ret);
        return ret;
    }


    /**
     * buildSearch - 组合模糊搜索
     *
     * @param  {type} search_key 模糊搜索关键字，可以是站名和站号
     * @return {type}            description
     */
    buildSearch(search_key) {
        return {
            '$or': [
                {
                    station_name: {
                        '$like':`%${search_key}%`,
                    },
                },
                {
                    station_full_name:{
                        '$like':`%${search_key}%`,
                    },
                },
                {
                    sid: search_key
                }
            ]
        }
    }


    /**
     * async getHistory - 获取历史数据
     *
     * @param  {type} user                 session用户
     * @param  {type} dateranger= ""       时间范围
     * @param  {type} table="station_data" 搜索类型 station_data group_data battery_data
     * @param  {type} search_key=""        搜索关键字
     * @param  {type} areaid=""            搜索地区
     * @param  {type} startId=""           上一次搜索的记录ID 用于分页
     * @param  {type} startIndex=0         针对组合电池  上次搜索到某一条记录的第几位
     * @param  {type} page=1               当前页码
     * @param  {type} limit=20             每页多少条
     * @return {type}                      返回值 历史数据列表
     */
    async getHistory(user,dateranger= "",table="station_data", search_key="", areaid="",startId="",startIndex=0, page=1, limit=20) {
        const {Station, Tree, UpsInfo, BatteryInfo} = this.app.model;
        Station.belongsTo(Tree, {foreignKey:'aid', targetKey: 'id'})
        Station.belongsTo(UpsInfo, {foreignKey:'sn_key', targetKey: 'sn_key'})
        Station.belongsTo(BatteryInfo, {foreignKey:'sn_key', targetKey: 'sn_key'})
        let where = {};
        if(search_key) {
            where = this.buildSearch(search_key)
        }

        let mongoQuery = {};

        if(areaid) {
            where.aid = {
                '$in': areaid.split(",")
            }
            mongoQuery['aid'] = {
                $in: areaid.split(",")
            }
        }else{
            if(user.manage_station !== "*") {
                where.aid = {
                    '$in': user.manage_station.split(",")
                }
                mongoQuery['aid'] = {
                    $in: user.manage_station.split(",")
                }
            }
        }

        let totalStations = await Station.findAll(
            {
                where: where,
                attributes: ['sn_key', 'station_name', 'sid'],
                include: [
                    {
                        model: UpsInfo,
                        attributes: ['ups_maintain_date', 'ups_power', 'ups_max_discharge', 'ups_max_charge']
                    }
                ]
            }
        ); // 获取总站数
        let sn_key_mapTo_station_name = {};
        let sn_keys = [];

        let _totalStations = JSON.parse(JSON.stringify(totalStations));
        console.log(_totalStations);
        if(_totalStations.length <= 0) {
            return {
                rows: [],
                startId: startId,
                endId: "",
                endIndex: "",
                startIndex: startIndex,
            }
        }
        _totalStations.forEach(item => {
            sn_keys.push(item.sn_key);
            sn_key_mapTo_station_name[item.sn_key] = item;
        });

        if(dateranger) {
            mongoQuery['record_time'] = {
                $gte: dateranger.split(",")[0],
                $lte: dateranger.split(',')[1],
            }
        }

        if(sn_keys.length > 0){
            mongoQuery['sn_key'] = {
                $in: sn_keys
            }
        }

        if(table === "group_data" || table === "battery_data") {
            let filter = {
                group: table === "group_data" ? 1 : -1,
                battery: table === "battery_data" ? 1 : -1,
                aid: 1,
                record_time: 1,
                sn_key: 1,
                station_name: 1,
                _id: 1,
            };

            // 开始的mongo的ID
            if(startId) {
                mongoQuery._id = {
                    $lte: ObjectID(startId),
                };
            }
            console.log('mongoQuery', mongoQuery, 'filter', filter, 'skip', parseInt(startIndex));
            let data = await this.app.mongo.db.collection('station_data').find(mongoQuery,filter).sort({
                record_time:-1,
                _id: -1,
            }).limit(limit).toArray();
            let cdata = [];
            let endId = "";
            let endIndex = 0;
            // console.log('startId')
            data.forEach(item => {
                let infodata = table === "group_data" ? item.group:item.battery;
                infodata.forEach((citems, index) => {
                    console.log('startId',startId, 'itemid', item._id, 'index', index, 'startIndex', startIndex, startId === item._id.toString());
                    if(startId && startId === item._id.toString() && index < parseInt(startIndex)) {
                        // 上次包含过的，不再重复取
                        return;
                    }
                    if(cdata.length >= limit) {
                        if(endIndex !== 0) {
                            return;
                        }
                        // 不取了，就这些了
                        endIndex = index;
                        return;
                    }
                    cdata.push({
                        sn_key: item.sn_key,
                        aid: item.aid,
                        record_time: item.record_time,
                        station_name: sn_key_mapTo_station_name[item.sn_key].station_name || "未知",
                        ups_power : sn_key_mapTo_station_name[item.sn_key].ups_info.ups_power || "" ,
                        ups_maintain_date : sn_key_mapTo_station_name[item.sn_key].ups_info.ups_maintain_date || "",
                        sid : sn_key_mapTo_station_name[item.sn_key].sid || "",
                        ...citems
                    })
                    endId = item._id;
                })
            })

            // console.log(cdata);

            if(startIndex && startId && cdata.length > 0 && cdata[cdata.length-1]._id == startId) {
                endIndex = parseInt(startIndex) + endIndex;
            }
            return {
                rows: cdata,
                startId: startId,
                endId: endId,
                endIndex: endIndex,
                startIndex: startIndex,
            }
        }

        if(table === "station_data") {
            let filter = {
                station: 1,
                aid: 1,
                record_time: 1,
                sn_key: 1,
                station_name: 1,
                _id: 1,
            };
            // 开始的mongo的ID
            if(startId) {
                mongoQuery._id = {
                    $lt: ObjectID(startId),
                };
            }

            console.log('mongoQuery', mongoQuery, 'filter', filter, 'skip', parseInt(startIndex));
            let data = await this.app.mongo.db.collection('station_data').find(mongoQuery,filter).sort({
                record_time:-1,
                _id: -1,
            }).limit(limit).toArray();
            let endId = "";
            data = data.map(item => {
                let stationInfo = Object.assign({}, item.station);
                console.log(item);
                item.station_name = sn_key_mapTo_station_name[item.sn_key].station_name || "未知";
                item.ups_power = sn_key_mapTo_station_name[item.sn_key].ups_info.ups_power || "" ;
                item.ups_maintain_date = sn_key_mapTo_station_name[item.sn_key].ups_info.ups_maintain_date || "";
                item.sid = sn_key_mapTo_station_name[item.sn_key].sid || "";
                item = Object.assign(item, stationInfo);
                delete item.station;
                delete item.group;
                delete item.battery;
                endId = item._id;
                return item;
            })

            return {
                rows: data,
                startId: startId,
                endId: endId,
                endIndex: 0,
                startIndex: 0,
            }
        }

    }


    /**
     * async getRealtimeCaution - 获取实时报警数据
     *
     * @param  {type} user          用户session
     * @param  {type} ctype= ""     类型
     * @param  {type} search_key="" 搜索关键字
     * @param  {type} areaid=""     所在区域
     * @param  {type} page=1        当前页码
     * @param  {type} limit=20      每页多少条
     * @return {type}               description
     */
    async getRealtimeCaution(user,ctype= "" , search_key="", areaid="", page=1, limit=20) {
        const {Station, Tree, StationAlertDesc} = this.app.model;
        Station.belongsTo(Tree, {foreignKey:'aid', targetKey: 'id'})
        // Station.belongsTo(StationAlertDesc, {foreignKey:'aid', targetKey: 'id'})

        let where = {};
        if(search_key) {
            where = this.buildSearch(search_key)
        }

        if(areaid) {
            where.aid = {
                '$in': areaid.split(",")
            }
        }else{
            if(user.manage_station !== "*") {
                where.aid = {
                    '$in': user.manage_station.split(",")
                }
            }
        }

        let _alertDesc = await StationAlertDesc.findAll();
        let alertDesc = {};
        JSON.parse(JSON.stringify(_alertDesc)).forEach(item => {
            alertDesc[item.en] = item;
        });

        let totalStations = await Station.findAll(
            {
                where: where,
                attributes: ['sn_key', 'station_name', 'sid'],
            }
        ); // 获取总站数
        let sn_key_mapTo_station_name = {};
        let totalCautionKeys = [];

        let _totalStations = JSON.parse(JSON.stringify(totalStations));
        console.log(_totalStations);
        _totalStations.forEach((item,index) => {

            totalCautionKeys.push(`caution:${this.app.areamap[item.sn_key]}:${item.sn_key}`);
            sn_key_mapTo_station_name[item.sn_key] = item;
        });

        let data = await this.app.redis.mget(totalCautionKeys);
        let results = [];
        data.forEach(item => {
            try{
                let _item = JSON.parse(item);
                ['station','group','battery'].forEach(__item => {
                    if(_item[__item] && _item[__item].length > 0) {
                        _item[__item].forEach(oItem => {
                            if(results.length > 100) {
                                // 最多只取100个站的数据
                                return;
                            }
                            results.push({
                                ...oItem,
                                aid: _item.aid,
                                record_time: _item.record_time,
                                sn_key: _item.sn_key,
                                desc: alertDesc[oItem.code].desc,
                                station_name: sn_key_mapTo_station_name[_item.sn_key].station_name,
                                sid: sn_key_mapTo_station_name[_item.sn_key].sid,
                            })
                        })
                    }

                })
            }catch(e) {
                console.log('unknow error', e.message);
            }
        })

        // console.log('datas', results);


        return {
            rows: results,
            count: results.length,
        }
    }

    /**
     * 列表页面获取站点列表
     */
    async filter(search_key="", areaid="", page=1, limit=20) {
        const {Station, Tree} = this.app.model;
        Station.belongsTo(Tree, {foreignKey:'aid', targetKey: 'id'})
        let where = {};
        if(search_key) {
            where = this.buildSearch(search_key);
        }

        if(areaid) {
            where.aid = {
                '$in': areaid.split(",")
            }
        }

        let res = await Station.findAndCountAll({
            where: where,
            limit: limit,
            offset: (page-1)*limit,
            include: [
                {
                    model: Tree,
                }
            ]
        });

        return res;

    }
}

module.exports = SiteService;
