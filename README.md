# Getting Started Discord-disconnect-app

## Environment

**Node.js 16.6.0 or newer is required.**

**discord.js v13**

### Steps

1. Clone the files down
1. Create discord bot on discord developer page
1. Copy the discord bot token to the config.json
1. Copy discord bot client id to the config.json
1. Copy discord channel's guild to the config.json
1. Key "npm install" on command then install all node_modules
1. Subscribe bot command on discord, Key "node deploy-commands.js"
1. Run the main code, Key "node index.js"

### This is only for local run steps. 
### Turn on the computer or cmd then bot will offline.

## Discord bot command is slashcommand

```
/disconnectchannel channel:xxx member:xxx
/disconnectchannelbytime channel:xxx time: min:sec or time min分sec秒 member:xxx

min and sec is interger.
member is not require, if that is null then all people disconnect.
```