module.exports = [
    {
        col: 'battery_factory',
        desc:'生产厂家',
        rules: [{
            required: true,
            message: '生产厂家不能为空'
        }]
    }, {
        col:'battery_num',
        desc: '电池型号',
    }, {
        col: 'battery_date',
        desc: '生产日期',
        objectType: {
            'ctype': 'DatePicker',
        }
    }, {
        col: 'battery_voltage',
        desc: '标称电压(V)',
    }, {
        col: 'battery_oum',
        desc: '标称内阻(MΩ)',
    }, {
        col:'battery_dianrong',
        desc: '电池标称容量(Ah):'
    }, {
        col: 'battery_float_voltage',
        desc: '浮充标准电压(V)'
    }, {
        col: 'battery_max_current',
        desc: '最大充电电流(A)'
    }, {
        col: 'battery_max_discharge_current',
        desc: '最大放电电流(A)',
    }, {
        col: 'battery_float_up',
        desc: '浮充电压上限(V)',
    }, {
        col: 'battery_float_dow',
        desc: '电池浮充电压下限(V)'
    }, {
        col: 'battery_discharge_down',
        desc: '放电电压下限(V)',
    }, {
        col: 'battery_scrap_date',
        desc: '强制报废日期',
        objectType: {
            'ctype': 'DatePicker',
        }
    }, {
        col: 'battery_life',
        desc: '设计寿命(年)',
    }, {
        col: 'battery_column_type',
        desc: '电池级柱类型',
    }, {
        col: 'battery_temperature',
        desc: '温度要求(度)',
    }, {
        col: 'battery_humidity',
        desc: '湿度要求(%)',
    }, {
        col: 'battery_type',
        desc: '电池种类',
    }, {
        col: 'battery_factory_phone',
        desc: '电池厂家联系电话',
    }, {
        col: 'remark',
        desc: '备注',
    }
];
