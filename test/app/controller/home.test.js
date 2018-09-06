'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {

    it('自动批量添加站点1000个', async()=> {
        const ctx = app.mockContext({});

        let start=1;
        let sn_key_start = 1;
        async function autoAdd() {
            if(sn_key_start > 1014){
                console.log('全部添加结束');
                return;
            }
            let data =  await ctx.service.site.stationById(302);
            data = JSON.parse(JSON.stringify(data));
            delete data.id;
            data.sid = start;
            data.station_name = "自动站点"+sn_key_start;
            data.sn_key = '300000' + sn_key_start.toString().padStart(3, "0");
            data.ups_info.sn_key = data.battery_info.sn_key = data.sn_key;
            let ups_info = Object.assign({},data.ups_info);
            let battery_info = Object.assign({},data.battery_info);
            delete data.ups_info;
            delete data.battery_info;
            let res = await ctx.service.site.createOrUpdate({
                station: data,
                ups_info: ups_info,
                battery_info: battery_info,
            })
            console.log('添加完成', data.station_name);
            start++;
            sn_key_start++;
            await autoAdd();
        }
        await autoAdd();
    });
});
