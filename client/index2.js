'use strict';
const net = require('net');
let errors = require('./data_tpl/error.js').replace(/\s/g,"");
// var batteryTpl = require("./data_tpl/battery.js").replace(/\s/g,"");
//console.log(errors);
var mock = require("./generater.js");
function startClient(sn_key){
let client = net.connect({
    port: 60026
}, () => {
    // 'connect' listener
    console.log('connected to server!');
    setInterval(function() {
        var data = mock(sn_key);
        console.log('发送正常数据', data);
        client.write(data);
    }, 1000*60*30); // 30分钟发送一次数据，其他时间发送
    setInterval(() => {
        let heatbeat_data = `<{"sn_key":${sn_key},"sid":${+sn_key.toString().substring(7,10)}}>`;
        console.log('发送心跳包', heatbeat_data);
        client.write(heatbeat_data)
    },1000*10); // 10秒发送一次心跳包

    setInterval(() => {
        // 30秒发送一次报警数据
        let cerrors = errors.replace(/{sn_key}/g, sn_key);
        console.log('发送错误信息', cerrors);
        let hasCaution = Math.random();
        //if(hasCaution > 0.5) client.write(`<${cerrors}>`);
    }, 1000*10)
});
client.on('data', (data) => {
    console.log(data.toString());
    let incoming = data.toString('utf-8').replace(/[<>]/g, '');
    incoming = JSON.parse(incoming);
    if(incoming.FuncSel && incoming.FuncSel.Operator === 3){
        // 发送一次站数据
        let cdata = mock(sn_key);
        client.write(cdata);
    }
    // client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
    console.log('reconnect after 5s');
    setTimeout(()=>{
        startClient(sn_key);
    },5000)
});
client.on('error', (error)=> {
    console.log("some error", error);
    client.end();
    // setTimeout(()=>{
    //     startClient(sn_key);
    // },5000)
})
}

var clients = process.argv[2] || 1;
var start = process.argv[3] || 100000510;
for(var i = 0 ; i < clients ; i++){
    (function(i){

        startClient((start+i));

    })(i)
}
/*
['1160612346'].forEach(function(item){
    startClient(item*10000);
})
*/
