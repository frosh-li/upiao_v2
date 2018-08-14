
const Service = require('egg').Service;

class StationAlertDescService extends Service {
    async findAll() {
        const {StationAlertDesc} = this.app.model;
        const data = await StationAlertDesc.findAndCountAll({});
        return data;
    }

    async update(obj) {
        const {StationAlertDesc} = this.app.model;
        return await StationAlertDesc.update(obj, {
            where: {
                id: obj.id
            }

        })
    }

    async create(obj) {
        const {StationAlertDesc} = this.app.model;
        return await StationAlertDesc.create(obj);
    }
}

module.exports = StationAlertDescService;
