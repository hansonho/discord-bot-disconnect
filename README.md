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

## License
```
MIT License

Copyright (c) 2021 Hanson Ho

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```