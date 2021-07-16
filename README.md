# discord-slash

Utils for handling Discord slash commands

# Usage

```js
const DiscordSlash = require("discord-slash");

const manager = new DiscordSlash.CommandManager(process.env.DISCORD_ID, { botToken: process.env.DISCORD_TOKEN });

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

# Documentation

## Table of Contents
