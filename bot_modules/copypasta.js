/**
 * COPYPASTA - Sends only the best and most rational copypastas
 */

let botConfig = require("../config.json");
let serverConfig = require("../server_config.js");

let help = "**Copypastas**\n";
help += "Sends only the best and most rational copypastas.\n";
help += "*!pasta*, *!listpastas*.\n";

//** Command handlers

let commandHandlers = {};

commandHandlers.pasta = function (message, args) {

  if (!message.guild) {

    message.channel.send("This command must be run in a server.");

    return false;

  }

  getPastas(message.guild.id, function (pastas) {

    if (Object.keys(pastas).indexOf(args) !== -1) {

      let pasta = pastas[args];

      message.channel.send(pasta);
      
    } else {

      message.channel.send("Couldn't find that pasta!");

    };
    
  });

};

commandHandlers.listpastas = function (message, args) {

  if (!message.guild) {

    message.channel.send("This command must be run in a server.")

    return false;

  }

  getPastas(message.guild.id, function (pastas) {

    if (typeof pastas === "object" && Object.keys(pastas).length > 0) {
      
      message.channel.send("```" + Object.keys(pastas) + "```");
      
    } else {
      
      message.channel.send("There aren't any copypastas configured for this server. Sorry :(");
      
    }

  });

};

let getPastas = function (guildId, callback) {

  serverConfig.getServerConfig(guildId, function (config) {

    if (config.moduleConfig && config.moduleConfig.copypasta && config.moduleConfig.copypasta.pastas) {

      callback(config.moduleConfig.copypasta.pastas);

    } else {

      callback([]);
      
    }

  });

};

//** Module Exports

module.exports = {
  "help": help,
  "commandHandlers": commandHandlers
};
