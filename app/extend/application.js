const _sockets = Symbol('Application#_sockets');
const cautionHistoryMap = Symbol('Application#cautionHistoryMap');
module.exports = {
    get _sockets () {
        if(!this[_sockets]){
            this[_sockets] = new Map();
        }

        return this[_sockets];
    },

    showSockets() {
        this.logger.info('当前已连接站点',this._sockets.keys());
    },

    addSocket(sn_key, socket) {
        this._sockets.set(sn_key, socket);
    },

    removeSocket(sn_key) {
        this._sockets.delete(sn_key);
    },

    get cautionHistoryMap() {
        if(!this[cautionHistoryMap]) {
            this[cautionHistoryMap] = new Map();
        }
        return this[cautionHistoryMap];
    },

    getLastCautionBySnKey(sn_key) {
        return this.cautionHistoryMap.get(sn_key);
    },

    updateLastCautionBySnKey(sn_key){
        this.cautionHistoryMap.set(sn_key, +new Date());
    },

}
