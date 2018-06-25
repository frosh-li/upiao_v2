const net = require('net');
const path = require('path');
const fs = require('fs');

process.env.TZ = "Asia/Shanghai";


function convertName(str){
	str = str.replace(".js",'');
	str = str.replace(/_([a-z]{1})/g, (rs, $1)=>{return $1.toUpperCase()});
	return str;
}
async function StartSocket(config, app) {
    const ctx = await app.createAnonymousContext();
    function onError(error) {
        app.logger.info('socket error', this.sn_key);
        //throw new Error(error);
        this.end();
    }

    function onEnd(msg) {
        if(this.sn_key){
            app.removeSocket(this.sn_key);
            ctx.service.socketData.onDisconnect(this.sn_key);
        }
        app.logger.info('socket end', this.sn_key);
    }

    function onTimeout() {
        app.logger.info('socket timeout', this.sn_key);
        this.end();
    }

    function onDrain() {
        app.logger.info('socket drain', this.sn_key);
    }

    const defaultEvents = {
      onError,
      onEnd,
      onTimeout,
      onDrain,
    };

    const server = net.createServer(async socket => {
        // 发送初始化指令
        await ctx.service.socketData.init(socket);

        [ 'Error', 'End', 'Timeout', 'Drain' ].forEach(item => {
            socket.on(item.toLowerCase(), config[`on${item}`] || defaultEvents[`on${item}`]);
        });

        socket.on('data', async (data) => {
            await ctx.service.socketData.handleReceive(data, socket);
        });

    });

    server.on('error', err => {
        throw err;
    });

    server.on('connection', socket => {
        server.getConnections((err, counts) => {
            app.logger.info('current connections', counts);
        });
    });

    server.listen(config.port);

    app.logger.info(`start socket server at ${config.port}`);
    return server;
}

module.exports = app => {
    app.logger.info("come to usocket");
    StartSocket(app.config.sockets.client, app);
    //app.addSingleton('sockets', StartSocket);
};
