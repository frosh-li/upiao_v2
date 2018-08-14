
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

    async create(obj) {
        const {Account} = this.app.model;
        return await Account.create(obj);
    }

    async update(obj) {
        const {Account} = this.app.model;
        await Account.findOneAndUpdate(Obj, {
            where: {
                id: obj.id
            }
        })
    }

    /**
     * 根据user获取对应的用户列表
     */
    async findAllByUser(user, offset=0, limit=20) {
        const {Account, Roles} = this.app.model;
        Account.belongsTo(Roles, {foreignKey: 'role', as: 'roles'})
        let where = {};
        if(user.manage_station !== "*") {
            where.manage_station = {
                '$in': user.manage_station.split(",")
            }
        }

        let data = await Account.findAndCountAll({
            where: where,
            offset: offset,
            limit: limit,
            attributes: [
                'phone',
                'username',
                'gender',
                'role',
                'backup_phone',
                'email',
                'postname',
                'location',
                'manage_station',
                'unit',
                'duty',
                'ismanage',
                'refresh',
                'create_time',
            ],
            include: [
                {
                    model: Roles,
                    as: 'roles'
                }
            ]
        })

        console.log(data);

        return data;
    }

    async findUserById(uid) {
        const {Account, Roles} = this.app.model;
        // Account.hasOne(Roles, {foreignKey: 'role', as: 'Role'})

        let where = {id: uid};

        let data = await Account.findOne({
            where: where,
            attributes: [
                'phone',
                'username',
                'gender',
                'role',
                'backup_phone',
                'email',
                'postname',
                'location',
                'manage_station',
                'unit',
                'duty',
                'ismanage',
                'refresh',
                'create_time',
            ],

        })

        console.log(data);

        return data;
    }
}

module.exports = UserService;
