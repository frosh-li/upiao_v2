const Service = require('egg').Service;

class ResistorService extends Service {
    /**
     * 内阻数据格式为
     * { ResistorVal: [ { sn_key: '1161106105', bid:10, gid: 2, Resistor: 10.6 } ] }
     * 收到内阻数据，更新内阻采集表
     */
    async parser(data) {
        let R = data.ResistorVal[0].Resistor;
		let sn_key = data.ResistorVal[0].sn_key.toString();
        let groupid = data.ResistorVal[0].gid.toString();
        let batteryid = data.ResistorVal[0].bid.toString();
		let obj = {
			stationid:sn_key,
			groupid:groupid,
			batteryid:batteryid,
			R:R
		};

        const {MyCollect} = this.app.model;
        await MyCollect.create(obj);
        logger.info('内阻采集结束', sn_key, groupid, batteryid);
    }
}

module.exports = ResistorService;
