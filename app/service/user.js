
const Service = require('egg').Service;

class UserService extends Service {
    async find(username, password) {
        const {MySysuser} = this.app.model;
        const user = await MySysuser.findOne({
            where: {
                username: username,
                password: password,
            }
        });
        return user;
    }
}

module.exports = UserService;
