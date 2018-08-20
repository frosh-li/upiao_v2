
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
        // 如果密码没有修改就不要更新密码

        if(obj.password === "") {
            delete obj.password;
        }
        await Account.update(obj, {
            where: {
                id: obj.id
            }
        })
    }

    /**
     * 根据user获取对应的用户列表
     */
    async findAllByUser(user, offset=0, limit=20) {
        const {Tree} = this.app.model;
        let where = " where 1=1 ";
        if(user.manage_station !== "*") {
            where += ` and account.manage_station in (${user.manage_station}) `;
        }
        let totalsQuery = await this.app.model.query(`
                SELECT
                    count(account.id) as count
                    FROM
                    account
                    ${where}
        `);

        let data = await this.app.model.query(`
            SELECT
                account.id,
                account.phone,
                account.username,
                account.gender,
                account.role,
                account.backup_phone,
                account.email,
                account.postname,
                account.location,
                account.manage_station,
                account.unit,
                account.duty,
                account.ismanage,
                account.refresh,
                account.create_time,
                roles.id AS "roles.id",
                roles.rolename AS "roles.rolename"
                FROM
                account LEFT OUTER JOIN roles ON account.role = roles.id
                ${where}
                LIMIT ${offset}, ${limit}
            `
        )

        console.log(data);

        let rows = data[0];

        let areaSqls = [];

        rows.forEach(item => {
            let where = {};
            if(item.manage_station !== "*"){
                where.id = {
                    '$in': item.manage_station.split(",")
                }
                areaSqls.push(Tree.findAll({
                    where: where
                }))
            }else{
                areaSqls.push(new Promise((resolve) => {
                    return resolve("全国");
                }))
            }
        });

        let areas = await Promise.all(areaSqls);
        console.log('areas');
        console.log(areas);

        rows.forEach((item, index) => {
            rows[index]['areas'] = areas[index];
        })
        return {
            rows: rows,
            count: totalsQuery[0],
        };
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
