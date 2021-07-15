const phin = require("phin");
const Command = require("./Command");

class Client {
    constructor(appID, authorization) {
        this.appID = appID;
        this.authorization = authorization.bearerToken ? `Bearer ${authorization.bearerToken}` : `Bot ${authorization.botToken}`;
        this.globalCache = new Map();
        this.guildCache = new Map();
    }
}

module.exports = Client;
