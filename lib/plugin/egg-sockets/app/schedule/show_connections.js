const Subscription = require('egg').Subscription;

class ShowSocketsConnections extends Subscription {
    static get schedule() {

        return {
            interval: '10s',
            type: 'all'
        }
    }

    async subscribe() {
        await this.service.globalSocketMap.showSockets();
    }
}

module.exports = ShowSocketsConnections;
