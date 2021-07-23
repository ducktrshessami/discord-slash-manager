const { Collection } = require("@discordjs/collection");

class CommandCache extends Collection {
    constructor(manager, guildID) {
        super();
        Object.defineProperties(this, {
            manager: {
                value: manager,
                enumerable: true
            },
            guildID: {
                value: guildID,
                enumerable: Boolean(guildID)
            }
        });
    }

    fetch(id) {
        return id ? this.manager.fetch(id, this.guildID) : this.manager.fetchAll(this.guildID);
    }

    destroy(id) {
        return id ? this.manager.destroy(id, this.guildID) : Promise.all(this.array().map(command => command.destroy()));
    }
}

module.exports = CommandCache;
