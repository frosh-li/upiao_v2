module.exports = [
    {
        col: 'station_name',
        desc:'站点名称',
        rules: [{
            required: true,
            message: '站点名称不能为空'
        }]
    }, {
        col:'station_full_name',
        desc: '站点全称',
        rules: [{
            required: true,
            message: '站点全称不能为空'
        }]
    }, {
        col: 'sn_key',
        desc: '物理地址',
        rules: [{
            required: true,
            message: '物理地址不能为空'
        }]
    }, {
        col: 'sid',
        desc: '站号',
        rules: [{
            required: true,
            message: '站号不能为空'
        }]
    }, {
        col: 'cur_sensor',
        desc: '电流传感器安装状态',
        rules: [{
            required: true,
            message: '电流传感器安装状态不能为空'
        }]
    }, {
        col:'site_location',
        desc: '站点地址'
    }, {
        col: 'site_latitude',
        desc: '站点纬度'
    }, {
        col: 'site_longitude',
        desc: '站点经度'
    }, {
        col: 'site_property',
        desc: '站点性质',
    }, {
        col: 'postal_code',
        desc: '邮编',
    }, {
        col: 'fix_phone',
        desc: '固定电话'
    }, {
        Divider: true,
    }, {
        col: 'ipaddress',
        desc: 'IP地址',
    }, {
        col: 'mac_address',
        desc: '网口MAC'
    }, {
        col: 'station_control_type',
        desc: '站点控制器型号',
    }, {
        col: 'ipaddress_method',
        desc: '控制器IP或方式',
    }, {
        col: 'groups',
        desc: '组数',
    }, {
        col: 'batteries',
        desc: '每组电池数',
    }, {
        col: 'battery_puts',
        desc: '电池码放状态',
        objectType: {
            'ctype': 'Select',
            'options': [{
                value: '平地',
                key: '平地'
            },{
                value: '机箱',
                key: '机箱'
            }]
        }
    }, {
        col: 'bms_install_date',
        desc: 'BMS系统安装时间',
        objectType: {
            'ctype': 'DatePicker',
        }
    }, {
        col: 'group_current_collect_type',
        desc: '组电流采集器型号',
    }, {
        col: 'group_current_collect_num',
        desc: '组电流采集器数量',
    }, {
        col: 'group_current_collect_install_type',
        desc: '组电流采集器安装模式'
    }, {
        col: 'battery_collect_type',
        desc: '电池数据采集器型号'
    }, {
        col: 'battery_collect_num',
        desc: '电池数据采集器数量'
    }, {
        col: 'inductor_brand',
        desc: '互感器品牌',
    },{
        col: 'inductor_type',
        desc: '互感器类型',
    }, {
        col: 'humiture_type',
        desc: '环境温湿度方式',
    }, {
        Divider: true,
    }, {
        col: 'functionary',
        desc: '负责人',
        rules: [{
            required: true,
            message: '负责人不能为空'
        }]
    }, {
        col: 'functionary_phone',
        desc: '负责人电话',
        rules: [{
            required: true,
            message: '负责人电话不能为空'
        }]
    }, {
        col: 'device_owner',
        desc: '设备负责人',
    }, {
        col: 'device_owner_phone',
        desc: '设备负责人电话',
    }, {
        col: 'emergency_person',
        desc: '紧急联系人'
    }, {
        col: 'emergency_phone',
        desc: '紧急联系人电话'
    }, {
        col: 'area_owner',
        desc: '区域主管',
    }, {
        col: 'area_owner_phone',
        desc: '区域主管电话'
    }, {
        col: 'area_owner_mail',
        desc: '是否接收邮件',
        objectType: {
            'ctype': 'Select',
            'options': [{
                value: 1,
                key: '是'
            },{
                value: '0',
                key: '否'
            }]
        }
    }, {
        col: 'area_owner_sms',
        desc: '是否接收短信',
        objectType: {
            'ctype': 'Select',
            'options': [{
                value: 1,
                key: '是'
            },{
                value: '0',
                key: '否'
            }]
        }
    }, {
        col: 'parent_owner',
        desc: '上级主管',
    }, {
        col: 'parent_owner_phone',
        desc: '上级主管电话',
    }, {
        col: 'parent_owner_mail',
        desc: '是否接收邮件',
        objectType: {
            'ctype': 'Select',
            'options': [{
                value: 1,
                key: '是'
            },{
                value: '0',
                key: '否'
            }]
        }
    }, {
        col: 'parent_owner_sms',
        desc: '是否接收短信',
        objectType: {
            'ctype': 'Select',
            'options': [{
                value: 1,
                key: '是'
            },{
                value: '0',
                key: '否'
            }]
        }
    }, {
        Divider: true,
    }, {
        col: 'has_light',
        desc: '灯光报警',
        objectType: {
            'ctype': 'Select',
            'options': [{
                value: 1,
                key: '有'
            },{
                value: '0',
                key: '无'
            }]
        }
    }, {
        col: 'has_speaker',
        desc: '声音报警',
        objectType: {
            'ctype': 'Select',
            'options': [{
                value: 1,
                key: '有'
            },{
                value: '0',
                key: '无'
            }]
        }
    }, {
        col: 'has_sms',
        desc: '短信报警',
        objectType: {
            'ctype': 'Select',
            'options': [{
                value: 1,
                key: '有'
            },{
                value: '0',
                key: '无'
            }]
        }
    }, {
        col: 'has_smart_control',
        desc: '智能控制',
        objectType: {
            'ctype': 'Select',
            'options': [{
                value: 1,
                key: '有'
            },{
                value: '0',
                key: '无'
            }]
        }
    }, {
        col: 'has_group_TH_control',
        desc: '温湿度传感器',
    }, {
        col: 'has_group_HO_control',
        desc: '氢氧气传感器',
    }, {
        col: 'remark',
        desc: '备注',
    }
];
