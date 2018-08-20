const Service = require('egg').Service;

class ParamterService extends Service {
    /**
     * 更新站组电池参数
     */
    async parser(data) {
        let sn_key = +data.StationPar.sn_key;
        const {StationParam, GroupParam, BatteryParam} = this.app.model;

        await Promise.all([
            StationParam.upsert(data),
            GroupParam.upsert(data),
            BatteryParam.upsert(data),
        ]);
    }
}

module.exports = ParamterService;
