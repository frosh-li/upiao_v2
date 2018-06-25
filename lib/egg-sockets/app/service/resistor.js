const Service = require('egg').Service;

class ResistorService extends Service {
    /**
     * 内阻数据格式为
     * { ResistorVal: [ { sn_key: '11611061050101', Resistor: 10.6 } ] }
     * 收到内阻数据，更新内阻采集表
     */
    async parser(data) {
        let R = data.ResistorVal[0].Resistor;
		let sn_key = data.ResistorVal[0].sn_key.toString();
		let obj = {
			stationid:sn_key.substring(0,10) + "0000",
			groupid:sn_key.substring(10,12),
			batteryid:sn_key.substring(12,14),
			R:R
		};

        const {MyCollect} = this.app.model;
        await MyCollect.create(obj);
        logger.info('内阻采集结束', sn_key);
    }
}

module.exports = ResistorService;
