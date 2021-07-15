const CommandOptionTypes = [
    "SUB_COMMAND",
    "SUB_COMMAND_GROUP",
    "STRING",
    "INTEGER",
    "BOOLEAN",
    "USER",
    "CHANNEL",
    "ROLE",
    "MENTIONABLE",
];

class Command {
    constructor(data) {
        this.id = data.id;
        this.appID = data.application_id;
        this.name = data.name;
        this.description = data.description;
        this.options = data.options ? data.options.map(option => new CommandOption(option)) : [];
        this.defaultPermission = data.default_permission !== false;
        this.guildID = data.guild_id;
    }

    update(data) {

    }

    destroy() {

    }
}

class CommandOption {
    #typeValue;

    constructor(data) {
        this.#typeValue = data.type;
        this.type = CommandOptionTypes[data.type - 1];
        this.name = data.name;
        this.description = data.description;
        this.required = data.required === true;
        this.choices = data.choices || [];
        this.options = data.options ? data.options.map(option => new CommandOption(option)) : [];
    }

    toString() {
        return JSON.stringify({
            type: this.#typeValue,
            name: this.name,
            description: this.description,
            required: this.required,
            choices: this.choices,
            options: this.options
        });
    }
}

module.exports = Command;
