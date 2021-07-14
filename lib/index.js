class Client {
    constructor(appID, authorization) {
        this.appID = appID;
        this.authorization = authorization;
        this.cache = new Map();
    }
}

module.exports = Client;
