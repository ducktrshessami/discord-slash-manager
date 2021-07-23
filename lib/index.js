const phin = require("phin");
const Command = require("./Command");
const CommandCache = require("./CommandCache");

class SlashManager {
    #authorization;

    constructor(appID, authorization) {
        Object.defineProperties(this, {
            appID: {
                value: appID,
                enumerable: true
            },
            globalCache: {
                value: new CommandCache(this),
                enumerable: true
            },
            guildCache: {
                value: new Map(),
                enumerable: true
            }
        });
        this.#authorization = authorization.bearerToken ? `Bearer ${authorization.bearerToken}` : `Bot ${authorization.botToken}`;
    }

    create(data) {
        return phin({
            url: data.guildID ? `https://discord.com/api/v8/applications/${this.appID}/guilds/${data.guildID}/commands` : `https://discord.com/api/v8/applications/${this.appID}/commands`,
            method: "POST",
            headers: { Authorization: this.#authorization },
            data: {
                name: data.name,
                description: data.description,
                options: data.options ? Command.parseOptions(data.options) : undefined,
                default_permission: data.defaultPermission
            },
            parse: "json"
        })
            .then(res => {
                if (res.statusCode === 201) {
                    let command = new Command(this, res.body);
                    (data.guildID ? this.#resolveGuildCache(data.guildID) : this.globalCache).set(command.id, command);
                    return command;
                }
            });
    }

    fetch(id, guildID) {
        return phin({
            url: guildID ? `https://discord.com/api/v8/applications/${this.appID}/guilds/${guildID}/commands/${id}` : `https://discord.com/api/v8/applications/${this.appID}/commands/${id}`,
            headers: { Authorization: this.#authorization },
            parse: "json"
        })
            .then(res => {
                if (res.statusCode === 200) {
                    let command = new Command(this, res.body);
                    (guildID ? this.#resolveGuildCache(guildID) : this.globalCache).set(command.id, command);
                    return command;
                }
                else {
                    throw new Error(`${res.statusCode} ${res.statusMessage}`);
                }
            });
    }

    fetchAll(guildID) {
        return phin({
            url: guildID ? `https://discord.com/api/v8/applications/${this.appID}/guilds/${guildID}/commands` : `https://discord.com/api/v8/applications/${this.appID}/commands`,
            headers: { Authorization: this.#authorization },
            parse: "json"
        })
            .then(res => {
                if (res.statusCode === 200) {
                    let cache = guildID ? this.#resolveGuildCache(guildID) : this.globalCache;
                    cache.clear();
                    res.body.forEach(command => {
                        cache.set(command.id, new Command(this, command));
                    });
                    return cache;
                }
                else {
                    throw new Error(`${res.statusCode} ${res.statusMessage}`);
                }
            });
    }

    update(data, id, guildID) {
        return phin({
            url: guildID ? `https://discord.com/api/v8/applications/${this.appID}/guilds/${guildID}/commands/${id}` : `https://discord.com/api/v8/applications/${this.appID}/commands/${id}`,
            method: "PATCH",
            headers: { Authorization: this.#authorization },
            data: {
                name: data.name,
                description: data.description,
                options: data.options ? Command.parseOptions(data.options) : undefined,
                default_permission: data.defaultPermission
            },
            parse: "json"
        })
            .then(res => {
                if (res.statusCode === 200) {
                    let cache = guildID ? this.#resolveGuildCache(guildID) : this.globalCache;
                    let command = cache.get(id);
                    if (command) {
                        Command.setFields(command, res.body);
                    }
                    else {
                        command = new Command(this, res.body);
                        cache.set(command.id, command);
                    }
                    return command;
                }
                else if (res.statusCode === 400) {
                    throw findErrors(res.body)
                        .map(error => new Error(error));
                }
                else {
                    throw new Error(`${res.statusCode} ${res.statusMessage}`);
                }
            });
    }

    destroy(id, guildID) {
        return phin({
            url: guildID ? `https://discord.com/api/v8/applications/${this.appID}/guilds/${guildID}/commands/${id}` : `https://discord.com/api/v8/applications/${this.appID}/commands/${id}`,
            method: "DELETE",
            headers: { Authorization: this.#authorization }
        })
            .then(res => {
                if (res.statusCode === 204 || res.statusCode === 404) {
                    (guildID ? this.#resolveGuildCache(guildID) : this.globalCache).delete(id);
                }
                else {
                    throw new Error(`${res.statusCode} ${res.statusMessage}`);
                }
            });
    }

    #resolveGuildCache(guildID) {
        if (!this.guildCache.has(guildID)) {
            this.guildCache.set(guildID, new CommandCache(this, guildID));
        }
        return this.guildCache.get(guildID);
    }
}

function findErrors(res, key = "") {
    if (res._errors) {
        return res._errors.map(obj => `${obj.code} ${obj.message}${key ? `: ${key}` : ""}`);
    }
    else {
        return [].concat(
            ...Object.keys(res)
                .filter(field => typeof res[field] === "object")
                .map(field => findErrors(res[field], field))
        )
    }
}

module.exports = SlashManager;
