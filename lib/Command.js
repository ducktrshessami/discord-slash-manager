const CommandOptionTypes = {
    "SUB_COMMAND": 1,
    "SUB_COMMAND_GROUP": 2,
    "STRING": 3,
    "INTEGER": 4,
    "BOOLEAN": 5,
    "USER": 6,
    "CHANNEL": 7,
    "ROLE": 8,
    "MENTIONABLE": 9
};

class Command {
    constructor(client, data) {
        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.options = data.options ? data.options.map(option => new CommandOption(option)) : [];
        this.defaultPermission = data.default_permission !== false;
        this.guildID = data.guild_id;
    }

    update(data) {
        return this.client.update(data, this.id, this.guildID);
    }

    destroy() {
        return this.client.destroy(this.id, this.guildID);
    }

    static parseOptions(options) {
        return options.map(option => ({
            type: typeof option.type === "number" ? option.type : CommandOptionTypes[option.type],
            name: option.name,
            description: option.description,
            required: option.required,
            choices: option.choices,
            options: option.options ? Command.parseOptions(option.options) : undefined
        }));
    }
}

function CommandOption(data) {
    this.type = Object.keys(CommandOptionTypes)[data.type - 1];
    this.name = data.name;
    this.description = data.description;
    this.required = data.required === true;
    this.choices = data.choices || [];
    this.options = data.options ? data.options.map(option => new CommandOption(option)) : [];
}

module.exports = Command;
