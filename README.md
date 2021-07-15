# discord-slash-manager

A client for managing Discord slash commands

Only handles API calls for command CRUD

Boilerplate code to handle receiving interactions to be added in future

# Usage

```js
const DiscordSlashManager = require("discord-slash-manager");

const manager = new DiscordSlashManager(process.env.DISCORD_ID, { botToken: process.env.DISCORD_TOKEN });

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

- Class: DiscordSlashManager
- Class: Command

## Class: DiscordSlashManager

## Class: Command
