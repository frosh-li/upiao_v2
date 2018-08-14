# eggUpiao

upiao server

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


### 初始化mongodb

- db.createCollection('caution')        报警数据历史表
- db.createCollection('station_data')   站数据历史表
- db.createCollection('group_data')     组数据历史表
- db.createCollection('battery_data')   电池数据历史表
- db.caution.createIndex({time: 1, sn_key: 1, type: 1})
- db.station_data.createIndex({record_time: 1, sn_key: 1})
- db.group_data.createIndex({record_time: 1, sn_key: 1})
- db.battery_data.createIndex({record_time: 1, sn_key: 1})
- db.createCollection('running_log')    运行日志历史表

### redis数据格式 用于记录实时数据

    realtime:station:sn_key
    realtime:group:sn_key
    realtime:battery:sn_key

    caution:sn_key  


### 中间件写法 参考middleware/auth.js


### 问题记录

    主管单位的编辑功能目前是不是不太合理
    像所辖站点个数是不是应该直接自动拉取他下面的站点，而不是手动输入
管理员和观察员也是应该从人员列表里面找到对应区域下的管理员和观察员显示

    经纬度问题，地图显示问题
