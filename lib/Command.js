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
    constructor(manager, data) {
        Object.defineProperties(this, {
            manager: {
                value: manager,
                enumerable: true
            },
            id: {
                value: data.id,
                enumerable: true
            },
            guildID: {
                value: data.guild_id,
                enumerable: Boolean(data.guild_id)
            }
        });
        Command.setFields(this, data);
    }

    update(data) {
        return this.manager.update(data, this.id, this.guildID);
    }

    destroy() {
        return this.manager.destroy(this.id, this.guildID);
    }

    static parseOptions(options) {
        return Array.isArray(options) ? options.map(option => ({
            type: typeof option.type === "number" ? option.type : CommandOptionTypes[option.type],
            name: option.name,
            description: option.description,
            required: option.required,
            choices: option.choices,
            options: option.options ? Command.parseOptions(option.options) : undefined
        })) : Command.parseOptions([options]);
    }

    static setFields(command, data) {
        command.name = data.name;
        command.description = data.description;
        command.options = data.options ? data.options.map(option => new CommandOption(option)) : [];
        command.defaultPermission = data.default_permission !== false;
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
