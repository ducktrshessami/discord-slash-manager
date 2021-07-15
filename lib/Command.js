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

    }

    destroy() {

    }

    static parseOptions(options) {

    }

    static updateFields(command, data) {

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
