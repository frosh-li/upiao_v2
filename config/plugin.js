'use strict';
const path = require('path');
exports.sockets = {
    enable: true,
    package: path.join(__dirname, '../lib/plugin/egg-sockets'),
    path:path.join(__dirname, '../lib/plugin/egg-sockets')
}

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
};

exports.redis = {
    enable: true,
    package: 'egg-redis',
};

exports.sessionRedis = {
    enable: true,
    package: 'egg-session-redis',
};

exports.mongo = {
    enable: true,
    package: 'egg-mongo-native',
};

exports.cors = {
    enable: true,
    package: 'egg-cors',
};

exports.assets = {
  enable: true,
  package: 'egg-view-assets',
};

// had enabled by egg
// exports.static = true;
