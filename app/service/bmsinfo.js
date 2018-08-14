
const Service = require('egg').Service;

class BmsinfoService extends Service {
    async findAll() {
        const {BmsInfo} = this.app.model;
        const bmsinfo = await BmsInfo.find();
        return bmsinfo;
    }

    async update(obj) {
        const {BmsInfo} = this.app.model;
        return await BmsInfo.findOneAndUpdate(obj,{
            where: {
                id: obj.id
            }
        })
    }
}

module.exports = BmsinfoService;
