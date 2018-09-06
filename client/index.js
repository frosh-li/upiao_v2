'use strict';
const net = require('net');
let errors = require('./data_tpl/error.js').replace(/\s/g,"");

var mock = require("./generater.js");
function startClient(sn_key){
    let interval_heartbeat = null;
    let interval_data = null;
    let interval_caution = null;


    let client = net.connect({
        port: 60026
    }, () => {
        // 'connect' listener
        clearInterval(interval_caution);
        clearInterval(interval_data);
        clearInterval(interval_heartbeat);
        console.log('connected to server!');
        interval_data = setInterval(function() {
            var data = mock(sn_key);
            console.log('发送正常数据', sn_key);
            client && client.write(data);
        }, 1000*60*30); // 30分钟发送一次数据，其他时间发送
        interval_heartbeat = setInterval(() => {
            let heatbeat_data = `<{"sn_key":${sn_key},"sid":${+sn_key.toString().substring(7,10)}}>`;
            console.log('发送心跳包', heatbeat_data);
            client && client.write(heatbeat_data)
        },1000*10); // 10秒发送一次心跳包

        interval_caution = setInterval(() => {
            // 30秒发送一次报警数据
            let cerrors = errors.replace(/{sn_key}/g, sn_key);

            let hasCaution = Math.random();
            if(hasCaution > 0.5) {
                console.log('发送错误信息',sn_key);
                client.write(`<${cerrors}>`)
            }
        }, 1000*20)
    });
    client.on('data', (data) => {
        console.log(data.toString());
        let incoming = data.toString('utf-8').replace(/[<>]/g, '');
        incoming = JSON.parse(incoming);
        if(incoming.FuncSel && incoming.FuncSel.Operator === 3){
            // 发送一次站数据
            let cdata = mock(sn_key);
           client &&  client.write(cdata);
        }
        // client.end();
    });
    client.on('end', () => {
        console.log('disconnected from server');
        console.log('reconnect after 10s');
        clearInterval(interval_caution);
        clearInterval(interval_data);
        clearInterval(interval_heartbeat);
        setTimeout(()=>{
            client.destroy();
            client = null;
            startClient(sn_key);
        },10000)
    });
    client.on('error', (error)=> {
        console.log("some error", error);
        client.end();
    })
}

var clients = process.argv[2] || 1;
var start = process.argv[3] || 100000100;
for(var i = 0 ; i < clients ; i++){
    (async function(i){
        await startClient((start+i));
    })(i)
}
