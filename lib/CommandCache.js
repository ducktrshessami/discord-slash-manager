class CommandCache {
    #cache;

    constructor(manager, guildID) {
        this.#cache = new Map();
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

    fetch(id) {
        return id ? this.manager.fetch(id, this.guildID) : this.manager.fetchAll(this.guildID);
    }

    destroy(id) {
        return id ? this.manager.destroy(id, this.guildID) : Promise.all(this.array().map(command => command.destroy()));
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
