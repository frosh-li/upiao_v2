const Service = require('egg').Service;

class GlobalSocketMapService extends Service {
    constructor(ctx) {
        super(ctx);
        // 用于记录sn_key对应的键值对 用来搜索socket对象等

    }
    /**
    * 监控socket的on data 事件
    */
    async handleReceive(data) {
        const { logger } = this;
        logger.info(data.toString('utf8'));
    }

    addSocket(sn_key, socket){
        const { logger } = this;
        logger.info('update sn-key', sn_key);
        this.app.addSocket(sn_key, socket);
        // logger.info(this._sockets.keys());
    }

    removeSocket(sn_key) {
        this.app.removeSocket(sn_key);
    }

    showSockets() {
        const {logger} = this;
        //logger.info(this._sockets.keys());
        this.app.showSockets();
        //return this._sockets.keys();
    }
}

module.exports = GlobalSocketMapService;
