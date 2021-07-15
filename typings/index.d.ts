declare module "discord-slash-client" {
    type Snowflake = String;

    type CommandCache = Map<Snowflake, Command>;

    type CommandOptionType =
        | "SUB_COMMAND"
        | "SUB_COMMAND_GROUP"
        | "STRING"
        | "INTEGER"
        | "BOOLEAN"
        | "USER"
        | "CHANNEL"
        | "ROLE"
        | "MENTIONABLE";

    type Authorization = {
        bearerToken?: String,
        botToken?: String,
    };

    type CommandOptionChoice = {
        name: String;
        value: String | Number;
    };

    type CommandData = {
        name: String;
        description: String;
        guildID?: Snowflake;
        options?: Array<CommandOption>;
        defaultPermission?: Boolean;
    };

    class CommandOption {
        public type: CommandOptionType;
        public name: String;
        public description: String;
        public required: Boolean;
        public choices: Array<CommandOptionChoice>;
        public options: Array<CommandOption>;

        private typeValue: Number;

        public toString(): String;
    };

    class Command {
        public id: Snowflake;
        public appID: Snowflake;
        public name: String;
        public description: String;
        public options: Array<CommandOption>;
        public defaultPermission: Boolean;
        public guildID?: Snowflake;

        public update(data: CommandData): Promise<Command>;
        public destroy(): Promise<void>;
    }

    class DiscordSlashClient {
        public appID: Snowflake;
        public authorization: String;
        public globalCache: CommandCache;
        public guildCache: Map<Snowflake, CommandCache>;

        constructor(appID: Snowflake, authorization: Authorization);

        public create(data: CommandData): Promise<Command>;
        public fetch(id: Snowflake, guildID?: Snowflake): Promise<Command>;
        public fetchAll(guildID?: Snowflake): Promise<Array<Command>>;
        public update(data: CommandData, id: Snowflake, guildID?: Snowflake): Promise<Command>;
        public destroy(id: Snowflake, guildID?: Snowflake): Promise<void>;
    }

    export = DiscordSlashClient;
}
