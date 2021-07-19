declare module "discord-slash" {
    type Snowflake = String;

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
        options?: CommandOptionData | Array<CommandOptionData>;
    };

    type CommandData = {
        name: String;
        description: String;
        guildID?: Snowflake;
        options?: CommandOptionData | Array<CommandOptionData>;
        defaultPermission?: Boolean;
    };

    class Command {
        public readonly manager: SlashManager;
        public readonly id: Snowflake;
        public readonly guildID?: Snowflake;
        public name: String;
        public description: String;
        public options: Array<CommandOption>;
        public defaultPermission: Boolean;

        public update(data: CommandData): Promise<Command>;
        public destroy(): Promise<void>;
    }

    class CommandCache {
        public readonly size: Number;
        public readonly guildID?: Snowflake;

        public array(): Array<Command>;
        public get(id: Snowflake): Command;
        public has(id: Snowflake): Boolean;
        public fetch(id?: Snowflake): Promise<CommandCache>;
        public destroyAll(): Promise<void>;

        protected _set(id: Snowflake, command: Command): CommandCache;
        protected _delete(id: Snowflake): Boolean;
    }

    class SlashManager {
        public readonly appID: Snowflake;
        public readonly globalCache: CommandCache;
        public readonly guildCache: Map<Snowflake, CommandCache>;

        private authorization: String;

        constructor(appID: Snowflake, authorization: Authorization);

        public create(data: CommandData): Promise<Command>;
        public fetch(id: Snowflake, guildID?: Snowflake): Promise<Command>;
        public fetchAll(guildID?: Snowflake): Promise<CommandCache>;
        public update(data: CommandData, id: Snowflake, guildID?: Snowflake): Promise<Command>;
        public destroy(id: Snowflake, guildID?: Snowflake): Promise<void>;

        private resolveGuildCache(guildID: Snowflake): CommandCache;
    }

    export = SlashManager;
}
