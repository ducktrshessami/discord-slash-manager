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

    array() {
        return Array.from(this.#cache.values());
    }

    get(id) {
        return this.#cache.get(id);
    }

    has(id) {
        return this.#cache.has(id);
    }

    _set(id, command) {
        this.#cache.set(id, command);
        return this;
    }

    _delete(id) {
        return this.#cache.delete(id);
    }
}

module.exports = CommandCache;
