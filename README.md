# discord-slash-manager

A controller for managing Discord slash commands

See also: [discord-interaction](https://github.com/ducktrshessami/discord-interaction)

# Usage

```js
const SlashManager = require("discord-slash-manager");

const manager = new SlashManager(process.env.DISCORD_ID, { botToken: process.env.DISCORD_TOKEN });

manager.create({
    name: "bonk",
    description: "Bonks the bot on the head",
    guildID: process.env.GUILD_ID,
    options: [
        {
            type: "INTEGER",
            name: "n",
            description: "How many times to bonk"
        }
    ]
})
    .catch(console.error);
```

[Documentation](https://github.com/ducktrshessami/discord-slash-manager/wiki)
