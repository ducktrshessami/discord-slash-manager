declare module "discord-slash-client" {
    type Snowflake = String;

    type Authorization = {
        bearerToken?: String,
        botToken?: String,
    };

    type CommandOptionChoice = {
        name: String;
        value: String | Number;
    };

    type CommandOption = {
        type: Number;
        name: String;
        description: String;
        required?: Boolean;
        choices?: Array<CommandOptionChoice>;
        options?: Array<CommandOption>;
    };

    type CommandData = {
        name: String;
        description: String;
        guildID?: Snowflake;
        options?: Array<CommandOption>;
        defaultPermission?: Boolean;
    };

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

    class DiscordSlashClient {
        public cache: Map<Snowflake, Command>;

        protected appID: Snowflake;
        protected authorization: String;

        constructor(appID: Snowflake, authorization: Authorization);

        public sync(force?: Boolean): Promise<void>;
        public create(data: CommandData): Promise<Command>;
        public fetch(id: Snowflake, guildID?: Snowflake): Promise<Command>;
        public fetchAll(guildID?: Snowflake): Promise<Array<Command>>;
        public update(data: CommandData, id: Snowflake, guildID?: Snowflake): Promise<Command>;
        public destroy(id: Snowflake): Promise<void>;
    }

    export = DiscordSlashClient;
}
