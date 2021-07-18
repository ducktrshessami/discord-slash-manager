# discord-slash-manager

A controller for managing Discord slash commands

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

# Documentation

## Table of Contents

1. [Class: SlashManager]()
    - [constructor(appID, authorization)]()
    - [SlashManager.appID]()
    - [SlashManager.globalCache]()
    - [SlashManager.guildCache]()
    - [SlashManager.create(data)]()
    - [SlashManager.fetch(id[, guildID])]()
    - [SlashManager.fetchAll([guildID])]()
    - [SlashManager.update(data, id[, guildID])]()
    - [SlashManager.destroy(id[, guildID])]()
2. [Class: Command]()
    - [Command.manager]()
    - [Command.id]()
    - [Command.guildID]()
    - [Command.name]()
    - [Command.description]()
    - [Command.options]()
    - [Command.defaultPermission]()
    - [Command.update(data)]()
    - [Command.destroy()]()
3. [Class: CommandCache]()

## Class: SlashManager

### constructor(appID, authorization)

### SlashManager.appID

### SlashManager.globalCache

### SlashManager.guildCache

### SlashManager.create(data)

### SlashManager.fetch(id[, guildID])

### SlashManager.fetchAll([guildID])

### SlashManager.update(data, id[, guildID])

### SlashManager.destroy(id[, guildID])

## Class: Command

### Command.manager

### Command.id

### Command.guildID

### Command.name

### Command.description

### Command.options

### Command.defaultPermission

### Command.update(data)

### Command.destroy()

## Class: CommandCache
