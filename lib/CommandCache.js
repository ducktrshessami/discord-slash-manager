class CommandCache {
    #cache;

    constructor(guildID) {
        this.#cache = new Map();
        Object.defineProperty(this, "guildID", {
            value: guildID,
            enumerable: Boolean(guildID)
        });
    }

    get size() {
        return this.#cache.size;
    }
}

module.exports = CommandCache;
