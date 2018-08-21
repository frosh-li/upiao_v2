import { isUrl } from '../utils/utils';

const menuData = [
    {
        name: '实时数据',
        icon: 'table',
        path: 'realtime',
        children: [
            {
                name: '实时监控',
                path: 'realtime-map'
            },
            {
                name: '站实时数据',
                path: 'station',
            },
            {
                name: '组实时数据',
                path: 'group',
            },
            {
                name: '电池实时数据',
                path: 'battery',
            }
        ]
    },
    {
        name: '数据查询',
        icon: 'search',
        path: 'search',
        children: [
            {
                name: '站数据',
                path: 'station',
            },
            {
                name: '组数据',
                path: 'group',
            },
            {
                name: '电池数据',
                path: 'battery',
            },
            {
                name: '数据报警',
                path: 'caution-data',
            },
            {
                name: '忽略警情',
                path: 'caution-ignore',
            },
            {
                name: '基本信息',
                path: 'baseinfo',
                children: [
                    {
                        name: '站点信息',
                        path: 'station',
                    },
                    {
                        name: '电池信息表',
                        path: 'battery',
                    }, {
                        name: '用户单位信息表',
                        path: 'company',
                    }, {
                        name: 'UPS信息表',
                        path: 'upsinfo',
                    }, {
                        name: 'BMS厂家信息',
                        path: 'bmsinfo',
                    }
                ]
            }, {
                name: '系统日志',
                path: 'system-log',
                children: [
                    {
                        name: '设置',
                        path: 'setting',
                    }, {
                        name: '用户登录登出',
                        path: 'login-out'
                    }, {
                        name: '其他',
                        path: 'others'
                    }
                ]
            }
        ]
    },
    {
        name: '设置',
        icon: 'setting',
        path:'setting',
        children: [
            {
                name: '基本信息',
                path: 'baseinfo',
                children: [
                    {
                        name: '区域管理',
                        path: 'areatree',
                    },
                    {
                        name: '站点信息',
                        path: 'station-list',
                    },
                    {
                        name: '电池信息',
                        path: 'battery-list',
                    },
                    {
                        name: 'UPS信息',
                        path: 'ups-list',
                    },
                    {
                        name: '主管单位信息',
                        path: 'company-list',
                    },
                    {
                        name: 'BMS厂家信息',
                        path: 'bms-info',
                    },
                ]
            },
            {
                name: '管理人员',
                path: 'personal',
                children: [
                    {
                        name: '人员',
                        path: 'user-list',
                    },
                    {
                        name: '角色',
                        path: 'role-list',
                    },
                ]
            },
            {
                name: '报警设置',
                path: 'caution',
            }
            ,
            {
                name: '参数',
                path: 'paramter',
                children: [
                    {
                        name: '站参数',
                        path: 'station'
                    },
                    {
                        name: '组参数',
                        path: 'group',
                    },
                    {
                        name: '电池参数',
                        path: 'battery',
                    },
                    {
                        name: '其他参数',
                        path: 'others'
                    }
                ]
            }
        ]

    },
  // {
  //   name: 'dashboard',
  //   icon: 'dashboard',
  //   path: 'dashboard',
  //   children: [
  //     {
  //       name: '分析页',
  //       path: 'analysis',
  //     },
  //     {
  //       name: '监控页',
  //       path: 'monitor',
  //     },
  //     {
  //       name: '工作台',
  //       path: 'workplace',
  //       // hideInBreadcrumb: true,
  //       // hideInMenu: true,
  //     },
  //   ],
  // },
  // {
  //   name: '表单页',
  //   icon: 'form',
  //   path: 'form',
  //   children: [
  //     {
  //       name: '基础表单',
  //       path: 'basic-form',
  //     },
  //     {
  //       name: '分步表单',
  //       path: 'step-form',
  //     },
  //     {
  //       name: '高级表单',
  //       authority: 'admin',
  //       path: 'advanced-form',
  //     },
  //   ],
  // },
  // {
  //   name: '列表页',
  //   icon: 'table',
  //   path: 'list',
  //   children: [
  //     {
  //       name: '查询表格',
  //       path: 'table-list',
  //     },
  //     {
  //       name: '标准列表',
  //       path: 'basic-list',
  //     },
  //     {
  //       name: '卡片列表',
  //       path: 'card-list',
  //     },
  //     {
  //       name: '搜索列表',
  //       path: 'search',
  //       children: [
  //         {
  //           name: '搜索列表（文章）',
  //           path: 'articles',
  //         },
  //         {
  //           name: '搜索列表（项目）',
  //           path: 'projects',
  //         },
  //         {
  //           name: '搜索列表（应用）',
  //           path: 'applications',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: '详情页',
  //   icon: 'profile',
  //   path: 'profile',
  //   children: [
  //     {
  //       name: '基础详情页',
  //       path: 'basic',
  //     },
  //     {
  //       name: '高级详情页',
  //       path: 'advanced',
  //       authority: 'admin',
  //     },
  //   ],
  // },
  // {
  //   name: '结果页',
  //   icon: 'check-circle-o',
  //   path: 'result',
  //   children: [
  //     {
  //       name: '成功',
  //       path: 'success',
  //     },
  //     {
  //       name: '失败',
  //       path: 'fail',
  //     },
  //   ],
  // },
  // {
  //   name: '异常页',
  //   icon: 'warning',
  //   path: 'exception',
  //   children: [
  //     {
  //       name: '403',
  //       path: '403',
  //     },
  //     {
  //       name: '404',
  //       path: '404',
  //     },
  //     {
  //       name: '500',
  //       path: '500',
  //     },
  //     {
  //       name: '触发异常',
  //       path: 'trigger',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  // {
  //   name: '账户',
  //   icon: 'user',
  //   path: 'user',
  //   authority: 'guest',
  //   children: [
  //     {
  //       name: '登录',
  //       path: 'login',
  //     },
  //     {
  //       name: '注册',
  //       path: 'register',
  //     },
  //     {
  //       name: '注册结果',
  //       path: 'register-result',
  //     },
  //   ],
  // },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
