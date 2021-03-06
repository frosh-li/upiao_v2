const Service = require('egg').Service;
const Command = require('../constants/cmd');

class SocketDataService extends Service {
    // 发送初始化指令
    async init(socket) {
        socket.write(Command.getStationData);
    }
    // 发送指令获取参数
    async sendCmdParam(socket) {
        socket.write(Command.getParamterData);
    }
    /**
     * 监控socket的on data 事件
     */
    async handleReceive(data, socket) {
        const { logger } = this;
        if(!socket.buffers) {
            socket.buffers = data.toString('utf8').replace(/\r\n/mg,"");
        }else {
            socket.buffers += data.toString('utf8').replace(/\r\n/mg,"");
        }

        this.parseData(socket);
    }

    async parseData(socket) {
        const {logger} = this;
        if(/<[^>]*>/.test(socket.buffers)){
    	   //如果有數據直接處理
    	   let omatch = socket.buffers.match(/<[^>]*>/)[0];
    	   let fullString = omatch;
    	   await this.dealData(fullString.replace(/[<>]/g,""), socket);
    	   socket.buffers = socket.buffers.replace(fullString,"");
    	   await this.parseData(socket);
    	}else{
    		if(socket.buffers.length > this.app.config.sockets.client.maxBuffer){
    			// 数据过多，并且无法解析，断开连接重新来
    			logger.info("因为数据过多，并且无法解析")
    			socket.end();
    		}
    	}
    }

    async dealData(str, socket) {
        const {logger, service} = this;
        // logger.info('incoming data-----',str);
    	try{
    		str = JSON.parse(str);
    	}catch(e){
    		// 如果出错清空之前的缓存数据
    		logger.info('JSON格式化错误');
    		logger.info(str);
    		socket.buffers = "";
    		return;
    	}

    	if(/^{"sn_key":"?[0-9]+"?,"sid":[0-9]+}$/.test(JSON.stringify(str))){
    		logger.info('心跳包:', JSON.stringify(str));
            // TODO: 处理心跳包数据
            service.heatbeat.parser(str, socket);
            return;
    	}

        if(str && str.ResistorVal){
    		logger.info('内阻返回值:', str);
            // TODO: 处理内阻数据
            service.resistor.parser(str);
            return;
    	}


    	if(str && str.StationPar){
    		// 如果是参数，处理参数
    		logger.info("参数返回:",str);
            // TODO: 更新参数
            service.paramter.parser(str);
            return;
    	}


    	if(str && (str.StationErr || str.GroupErr || str.BatteryErr)){
    		logger.info("报警数据:",str.StationErr.sn_key);
            // TODO: 处理报警数据
            service.caution.parser(str);
            return;
    	}

    	// logger.info(str);
    	if(str&&str.StationData){
            logger.info('完整站数据包:');
            if(str.StationData && str.StationData.sn_key) {
                let sn_key = str.StationData.sn_key;
                if(!socket.sn_key) {
                    socket.sn_key = sn_key;
                    await this.onConnect(sn_key);
                    await service.datalog.addLog(sn_key, `${sn_key}连接成功`);
                    service.globalSocketMap.addSocket(sn_key, socket);
                }
            }
            // TODO: 处理站数据
            service.station.parser(str);
    	}
    }

    /**
     * 站点断开连接
     * 清理站点数据
     * 更新系统报警表
     */
    async onConnect(sn_key) {
        const {logger, app} = this;
        const {Systemalarm} = app.model;
        await Systemalarm.destroy({
            where: {
                stationid: sn_key
            },
            force: true
        })

    }

    /**
     * 站点连接，清理连接表信息
     * 清理报警信息
     */
    async onDisconnect(sn_key) {
        let desc = "站点连接断开";
	    let tips = "检查站点或本地网络状况，电源及通信线路或联系BMS厂家";

        const {logger, app} = this;
        const {Systemalarm} = app.model;
        let aid = app.areamap[sn_key] || "";
        await Promise.all([
            app.redis.del(`realtime:station:${aid}:${sn_key}`),
            app.redis.del(`caution:${aid}:${sn_key}`),
            app.redis.zrem(`TEMPRANK`, sn_key),
            app.redis.zrem(`cautionrank:${aid}`, sn_key),
            app.redis.zrem(`lifetime:rank:${aid}`, sn_key),
            app.redis.zrem(`capacity:rank:${aid}`, sn_key),
            Systemalarm.upsert({
                stationid: sn_key,
                desc: desc,
                tips: tips
            })
        ]);
    }
}

module.exports = SocketDataService;
