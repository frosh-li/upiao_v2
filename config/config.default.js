'use strict';
const path = require('path');

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1529390017445_9298';

    // add your config here
    config.middleware = [];
    config.security = {
        domainWhiteList: [ 'http://localhost:8000' ],
        csrf:{
            enable: false,
            ignoreJSON: true,
        },
        methodnoallow: {
            enable: false,
        }
    };

    config.middleware = [
        'auth'
    ];

    config.auth = {
        enable: true,
        ignore: '/api_v2/login/account'
    }

    config.cors = {
        origin:"http://localhost:8000",
        allowMethod: "GET,HEAD,PUT,POST,DELETE,PATCH",
        credentials: true,
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
        database: 'qingda_v2',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: '123456',
        define: {
			timestamps: false
		}
    };

    config.redis = {
        client: {
            port: 6379,
            host: '127.0.0.1',
            password: '',
            db: 0,
        },
        agent:true,
    };


    config.view = {
        mapping: {
            '.js': 'assets'
        },
        root: path.join(appInfo.baseDir, 'app/assets'),
    };
    config.assets = {
        publicPath: '/public',
        devServer: {
            command: 'roadhog dev',
            port: 8000,
            env: {
                BROWSER: 'none',
                DISABLE_ESLINT: true,
                SOCKET_SERVER: 'http://127.0.0.1:8000',
                PUBLIC_PATH: 'http://127.0.0.1:8000',
            },
            debug: true,
        }
    };

    exports.mongo = {
        client:{
            host: '127.0.0.1',
            port: 27017,
            name: 'bms',
        }

    };



    return config;
};
