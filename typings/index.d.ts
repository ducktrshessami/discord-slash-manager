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

    type CommandOption = {
        type: CommandOptionType;
        name: String;
        description: String;
        required: Boolean;
        choices: Array<CommandOptionChoice>;
        options: Array<CommandOption>;
    };

    type CommandOptionData = {
        type: CommandOptionType;
        name: String;
        description: String;
        required?: Boolean;
        choices?: Array<CommandOptionChoice>;
        options?: Array<CommandOptionData>;
    };

    type CommandData = {
        name: String;
        description: String;
        guildID?: Snowflake;
        options?: Array<CommandOptionData>;
        defaultPermission?: Boolean;
    };

    class Command {
        public readonly client: DiscordSlashClient;
        public readonly id: Snowflake;
        public readonly guildID?: Snowflake;
        public name: String;
        public description: String;
        public options: Array<CommandOption>;
        public defaultPermission: Boolean;

        public update(data: CommandData): Promise<Command>;
        public destroy(): Promise<void>;
    }

    class DiscordSlashClient {
        public readonly appID: Snowflake;
        public readonly globalCache: CommandCache;
        public readonly guildCache: Map<Snowflake, CommandCache>;

        private authorization: String;

        constructor(appID: Snowflake, authorization: Authorization);

        public create(data: CommandData): Promise<Command>;
        public fetch(id: Snowflake, guildID?: Snowflake): Promise<Command>;
        public fetchAll(guildID?: Snowflake): Promise<Array<Command>>;
        public update(data: CommandData, id: Snowflake, guildID?: Snowflake): Promise<Command>;
        public destroy(id: Snowflake, guildID?: Snowflake): Promise<void>;

        private resolveGuildCache(guildID: Snowflake): CommandCache;
    }

    export = DiscordSlashClient;
}
