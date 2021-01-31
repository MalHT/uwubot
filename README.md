# uwubot

A meme bot for spenglers

## Features

uwubot is built to allow easy extension and customisation through use of modules.

The base bot provides cool features that include:

- Automated role management (users can request roles)
- Automatic 🇪 🇲 🇴 🇯 🇮 🇹 🇪 🇽 🇹
- Copypasta dumping
- Animal picture fetching

Features that may or may not be coming soon:

- `!ebooks` command to generate mashed up messages
- Discord-based word and drawing games
- Built-in web server (maybe!)
- Configuration management via admin commands (maybe!)

## Setup

Install it! Clone the repository and run `npm install`. This should get all the dependencies in place.

Next, you'll need to set up your config file. Copy the included `config_default.json` file to `config.json`.

You'll need to specify a Discord API key. You can get one from https://discordapp.com/developers/applications by creating a new application and adding a user.

Run with `node bot.js`.

## Configuration

The bot and its modules are configurable both globally, in `config.json`, and per-module, in files named after each server ID that the bot connects to in the `server_config` directory.

When the config is loaded in the context of a server, the global configuration is loaded and then the module configuration options given in the server configuration are added and override the global options.

This means you can not only configure module settings globally or per server, but that you can have a global configuration and a different configuration on one given server.

### Configuration files

The base `config.json` might look something like this.

```js
{
  "apikey": "your_apikey",
  "moduleConfig": {
    "animals": {
      "flickrApikey": "your_flickr_apikey",
      "flickrSecretkey": "your_flickr_secretkey"
    }
  }
}
```

The `moduleConfig` object contains a property for each module that has configuration options. Seen here is the global configuration for the `animals` module, which requires authentication details for the Flickr API to function.

A configuration file for a given server might look something like this.

```js
{
  "id": "1234567890",
  "lastKnownName": "uwubot is good and pure",
  "moduleConfig": {
    "autoroles": {
      "managedRoles": ["uwubot user"]
    }
  }
}
```

It has the same `moduleConfig` object. Here it specifies a managed role for the `autoroles` module.

Additionally, server config files contain an `id` and `lastKnownName`. The config files are identified by the server id, which must match the `id` inside the file. `lastKnownName` is provided and updated for convenience, allowing the server to be identified without knowing its `id`.
