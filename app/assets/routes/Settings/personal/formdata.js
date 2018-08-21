module.exports = [
    {
        col: 'phone',
        desc:'手机号',
        rules: [{
            required: true,
            message: '手机号不能为空'
        }]
    }, {
        col:'password',
        desc: '密码',
        rules: [{
            required: false,
            placeholder: '留空不修改密码',
            
        }]
    }, {
        col: 'unit',
        desc: '单位名称',
        rules: [{
            required: true,
            message: '单位名称不能为空'
        }]
    }, {
        col: 'backup_phone',
        desc: '备用电话',
        rules: [{
            required: true,
            message: '备用电话不能为空'
        }]
    }, {
        col: 'username',
        desc: '姓名',
        rules: [{
            required: true,
            message: '姓名不能为空'
        }]
    }, {
        col:'postname',
        desc: '职位'
    }, {
        col: 'email',
        desc: '邮箱'
    }, {
        col: 'location',
        desc: '地址'
    }, {
        col: 'duty',
        desc: '班次',
    }, {
        col: 'refresh',
        desc: '刷新频率',
    }, {
        col: 'role',
        desc: '角色',
        objectType: {
            'ctype': 'Select',
            'options': [{
                value: 1,
                key: '超级管理员'
            },{
                value: 2,
                key: '管理员'
            },{
                value: 3,
                key: '观察员'
            }]
        }
    }, {
        col: 'ismanage',
        desc: '是否有编辑权限',
        objectType: {
            'ctype': 'Select',
            'options': [{
                value: 1,
                key: '是'
            },{
                value: 0,
                key: '否'
            }]
        }
    }
];
