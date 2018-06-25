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
}
// had enabled by egg
// exports.static = true;
