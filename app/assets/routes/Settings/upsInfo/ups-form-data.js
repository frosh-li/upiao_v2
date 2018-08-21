module.exports = [
    {
        col: 'ups_factory',
        desc:'生产厂家',
        rules: [{
            required: true,
            message: '生产厂家不能为空'
        }]
    }, {
        col:'ups_type',
        desc: '型号',
    }, {
        col: 'ups_create_date',
        desc: '生产日期',
        objectType: {
            'ctype': 'DatePicker',
        }
    }, {
        col: 'ups_install_date',
        desc: '安装日期',
        objectType: {
            'ctype': 'DatePicker',
        }
    }, {
        col: 'ups_power',
        desc: '功率(W/H)',
        rules: [{
            required: true,
            message: '功率不能为空'
        }]
    }, {
        col: 'redundancy_num',
        desc: '冗余数量(台)',
        rules: [{
            required: true,
            message: '功率不能为空'
        }]
    }, {
        col:'ups_power_in',
        desc: '输入功率(W/A)',
        rules: [{
            required: true,
            message: '功率不能为空'
        }]
    }, {
        col: 'ups_power_out',
        desc: '输出功率(W/A)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_battery_vol',
        desc: '外接电池电压(V)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_battery_current',
        desc: '外接电池电流(A)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ac_protect',
        desc: 'AC过流保护(V/A)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'dc_protect',
        desc: 'DC过流保护(V/A)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'on_net',
        desc: '联网检测',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'alarm_content',
        desc: '报警内容',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'discharge_protect',
        desc: '放电保护值(%)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'floting_charge',
        desc: '浮充电压(V)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_vdc',
        desc: '电压范围(V)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_reserve_hour',
        desc: '额定候备时间(小时)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_charge_mode',
        desc: '充电方式',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_max_charge',
        desc: '最大充电电流(A)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_max_discharge',
        desc: '最大放电电流(A)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_period_days',
        desc: '规定维护周期(天)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_discharge_time',
        desc: '维护放电时长(分钟)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_discharge_capacity',
        desc: '维护放电容量(%)',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_maintain_date',
        desc: '维护到期日',
        rules: [{
            required: true,
            message: '不能为空'
        }],
        objectType: {
            'ctype': 'DatePicker',
        }
    }, {
        col: 'ups_vender_phone',
        desc: '联系电话',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_service',
        desc: '服务商',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_vender',
        desc: '服务商联系人',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'ups_service_phone',
        desc: '服务商电话',
        rules: [{
            required: true,
            message: '不能为空'
        }]
    }, {
        col: 'remark',
        desc: '备注',
    }
];
