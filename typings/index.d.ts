declare module "discord-slash-client" {
    type Snowflake = String;

    class CommandOptionChoice {
        public name: String;
        public value: String | Number;
    }

    class CommandOption {
        public type: Number;
        public name: String;
        public description: String;
        public required?: Boolean;
        public choices?: Array<CommandOptionChoice>;
        public options?: Array<CommandOption>;
    }

    class Command {
        public id: Snowflake;
        public appID: Snowflake;
        public name: String;
        public description: String;
        public guildID?: Snowflake;
        public options?: Array<CommandOption>;
        public defaultPermission?: Boolean;

        public update(data: CommandData): Promise<Command>;
        public destroy(): Promise<void>;
    }

    class CommandData {
        public name: String;
        public description: String;
        public guildID?: Snowflake;
        public options?: Array<CommandOption>;
        public defaultPermission?: Boolean;
    }

    class DiscordSlashClient {
        public cache: Map<Snowflake, Command>;

        protected appID: Snowflake;
        protected authorization: String;

        constructor(appID: Snowflake, authorization: String);

        public sync(force?: Boolean): Promise<void>;
        public create(data: CommandData): Promise<Command>;
        public fetch(id: Snowflake, guildID?: Snowflake): Promise<Command>;
        public fetchAll(guildID?: Snowflake): Promise<Array<Command>>;
        public update(data: CommandData, id: Snowflake, guildID?: Snowflake): Promise<Command>;
        public destroy(id: Snowflake): Promise<void>;
    }

    export = DiscordSlashClient;
}
