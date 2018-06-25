const Service = require('egg').Service;

class ParamterService extends Service {
    /**
     * 更新站组电池参数
     */
    async parser(data) {
        let sn_key = +data.StationPar.sn_key;
        const {TbStationParam, TbGroupParam, TbBatteryParam} = this.app.model;

        await Promise.all([
            TbStationParam.upsert(data),
            TbGroupParam.upsert(data),
            TbBatteryParam.upsert(data),
        ]);
    }
}

module.exports = ParamterService;
