class Client {
    constructor(appID, authorization) {
        this.appID = appID;
        this.authorization = authorization;
        this.globalCache = new Map();
        this.guildCache = new Map();
    }
}

module.exports = Client;
