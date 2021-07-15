function CommandOption(data) {
    this.type = Object.keys(CommandOptionTypes)[data.type - 1];
    this.name = data.name;
    this.description = data.description;
    this.required = data.required === true;
    this.choices = data.choices || [];
    this.options = data.options ? data.options.map(option => new CommandOption(option)) : [];
}

module.exports = CommandOption;
