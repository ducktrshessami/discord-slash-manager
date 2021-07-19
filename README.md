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

1. [Class: SlashManager](#class-slashmanager)
    - [constructor(appID, authorization)](#constructorappid-authorization)
    - [SlashManager.appID](#slashmanagerappid)
    - [SlashManager.globalCache](#slashmanagerglobalcache)
    - [SlashManager.guildCache](#slashmanagerguildcache)
    - [SlashManager.create(data)](#slashmanagercreatedata)
    - [SlashManager.fetch(id[, guildID])](#slashmanagerfetchid-guildid)
    - [SlashManager.fetchAll([guildID])](#slashmanagerfetchallguildid)
    - [SlashManager.update(data, id[, guildID])](#slashmanagerupdatedata-id-guildid)
    - [SlashManager.destroy(id[, guildID])](#slashmanagerdestroyid-guildid)
2. [Class: Command](#class-command)
    - [Command.manager](#commandmanager)
    - [Command.id](#commandid)
    - [Command.guildID](#commandguildid)
    - [Command.name](#commandname)
    - [Command.description](#commanddescription)
    - [Command.options](#commandoptions)
    - [Command.defaultPermission](#commanddefaultpermission)
    - [Command.update(data)](#commandupdatedata)
    - [Command.destroy()](#commanddestroy)
3. [Class: CommandCache](#class-commandcache)
    - [CommandCache.manager](#commandcachemanager)
    - [CommandCache.size](#commandcachesize)
    - [CommandCache.guildID](#commandcacheguildid)
    - [CommandCache.array()](#commandcachearray)
    - [CommandCache.get(id)](#commandcachegetid)
    - [CommandCache.has(id)](#commandcachehasid)
    - [CommandCache.fetch([id])](#commandcachefetchid)
    - [CommandCache.destroy([id])](#commandcachedestroyid)

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

### CommandCache.manager

### CommandCache.size

### CommandCache.guildID

### CommandCache.array()

### CommandCache.get(id)

### CommandCache.has(id)

### CommandCache.fetch([id])

### CommandCache.destroy([id])
