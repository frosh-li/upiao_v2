
const Service = require('egg').Service;

class UserService extends Service {
    async find(phone, password) {
        const {Account} = this.app.model;
        const user = await Account.findOne({
            where: {
                phone: phone,
                password: password,
            }
        });
        return user;
    }
}

module.exports = UserService;
