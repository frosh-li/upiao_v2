'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1529390017445_9298';

    // add your config here
    config.middleware = [];
    config.security = {
        csrf:{
            enable: false,
        }
    };
    config.sockets = {
        client: {
            host:"127.0.0.1",
            port: 60026,
            maxBuffer: 1024*1024, // 最大容量1M，超过1M自动清除
            socketTimeout: 60000, // socket超时时间 1分钟
            clearRealData: '10s', // 清理实时数据时间间隔
            showSockets: '10s', // 显示sockets连接数的时间间隔
            insertCautionInterval: 1000*60*20, //插入历史数据间隔
        }
    };
    config.sequelize = {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: 'db_bms_english4',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '123456',
        define: {
			timestamps: false
		}
    };

    return config;
};
