const CommandOption = require("./CommandOption");

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
        Object.defineProperties(this, {
            client: {
                value: client,
                enumerable: true
            },
            id: {
                value: data.id,
                enumerable: true
            },
            guildID: {
                value: data.guild_id,
                enumerable: true
            }
        });
        Command.setFields(this, data);
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

    static setFields(command, data) {
        command.name = data.name;
        command.description = data.description;
        command.options = data.options ? data.options.map(option => new CommandOption(option)) : [];
        command.defaultPermission = data.default_permission !== false;
    }
}

module.exports = Command;
