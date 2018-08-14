
const Service = require('egg').Service;

class RoleService extends Service {
    async findAll() {
        const {Roles} = this.app.model;
        const roles = await Roles.findAll({
        });
        return roles;
    }
}

module.exports = RoleService;
