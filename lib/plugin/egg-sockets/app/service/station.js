const Service = require('egg').Service;
const moment = require('moment');

const column = {

}

class StationService extends Service {
    /**
     * 写入站的实时和历史数据表
     */
    async parserStation(data) {
        let record_time = moment().format('YYYY-MM-DD HH:mm:ss');
        let obj = {
			record_time:record_time,
			sn_key:data.sn_key,
			GroBats:data.GroBats,
			Groups:data.Groups,
			sid:data.sid,
			Temperature:data.Temperature,
			TemCol:data.TemCol,
			Humidity:data.Humidity,
			HumCol:data.HumCol,
			Voltage:data.Voltage,
			VolCol:data.VolCol,
			Current:data.Current,
			CurCol:data.CurCol,
			ChaState: data.ChaState,
			Capacity:data.Capacity,
			Lifetime:data.Lifetime,
			CurSensor:data.CurSensor
		};

        const {logger, app} = this;
        const {TbStationModule, TbStationModuleHistory} = app.model;

        // 删除实时数据
        await TbStationModule.destroy({
            where: {
                sn_key: data.sn_key,
            },
            force: true,
        });

        // 添加实时数据

        await Promise.all([
            TbStationModule.create(obj),
            TbStationModuleHistory.create(obj),
        ]);

        logger.info("站数据写入完成", data.sn_key);
    }

    /**
     *  写入组的实时和历史数据表
     */
    async parserGroup(data, sid) {
        let record_time = moment().format('YYYY-MM-DD HH:mm:ss');
        let bulkData = [];
        data.forEach((item) => {
            bulkData.push({
                record_time:record_time,
				sn_key:item.sn_key,
				gid:item.gid,
				sid:sid,
				GroBats:item.GroBats||0,
				Humidity:item.Humidity || 0,
				HumCol:item.HumCol || 0,
				Voltage:item.Voltage || 0,
				VolCol:item.VolCol || 0,
				Current:item.Current || 0,
				CurCol:item.CurCol || 0,
				Temperature:item.Temperature|| 0,
				TemCol:item.TemCol || 0,
				ChaState: item.ChaState || 0,
				Avg_U:item.Avg_U || 0,
				Avg_T:item.Avg_T || 0,
				Avg_R:item.Avg_R || 0,
            })
        });

        const {logger, app} = this;

        const {TbGroupModule, TbGroupModuleHistory} = app.model;

        // 删除实时数据
        await app.model.query(`delete from tb_group_module where floor(sn_key/10000) = ${Math.floor(bulkData[0]['sn_key']/10000)}`);

        // 添加实时数据

        await Promise.all([
            TbGroupModule.bulkCreate(bulkData),
            TbGroupModuleHistory.bulkCreate(bulkData),
        ]);

        logger.info("组数据批量写入完成", Math.floor(bulkData[0]['sn_key']/10000));

    }

    /**
     * 写入电池实时和历史数据表
     */
    async parserBattery(data, sid) {
        let record_time = moment().format('YYYY-MM-DD HH:mm:ss');
        let bulkData = [];
        data.forEach((item) => {
            bulkData.push({
                record_time:record_time,
				sn_key:item.sn_key,
				bid:item.bid,
				gid:item.gid,
				mid:item.bid,
				sid:sid,
				Humidity:item.Humidity || 0,
				HumCol:item.HumCol || 0,
				DrvCurrent:item.DrvCurrent || 0,
				DrvCol:item.DrvCol || 0,
				Voltage:item.Voltage || 0,
				VolCol:item.VolCol || 0,
				Resistor:item.Resistor || 0,
				ResCol:item.ResCol || 0,
				Temperature:item.Temperature || 0,
				TemCol:item.TemCol || 0,
				Capacity:item.Capacity || 0,
				Lifetime:item.Lifetime || 0,
				Dev_R:item.Dev_R || 0,
				Dev_U:item.Dev_U || 0,
				Dev_T:item.Dev_T || 0,
				DevRCol:item.DevRCol || 0,
				DevUCol:item.DevUCol || 0,
				DevTCol:item.DevTCol || 0,
            })
        });

        const {logger, app} = this;

        const {TbBatteryModule, TbBatteryModuleHistory} = app.model;

        // 删除实时数据
        await app.model.query(`delete from tb_battery_module where floor(sn_key/10000) = ${Math.floor(bulkData[0]['sn_key']/10000)}`);

        // 添加实时数据

        await Promise.all([
            TbBatteryModule.bulkCreate(bulkData),
            TbBatteryModuleHistory.bulkCreate(bulkData),
        ]);

        logger.info("电池数据批量写入完成", Math.floor(bulkData[0]['sn_key']/10000));
    }

    async parser(ctype, data, sid) {

        if(ctype === 'station') {
            await this.parserStation(data);
        }

        if(ctype === 'group') {
            await this.parserGroup(data, sid);
        }

        if(ctype === 'battery') {
            await this.parserBattery(data, sid);
        }

    }
}

module.exports = StationService;
