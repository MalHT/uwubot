/**
 * Images with text on them, you know, for making funny meme pics.
 */

let Discord = require("discord.js");
let botConfig = require("../config.json");
let serverConfig = require("../server_config.js");

let help = "**Clap**\n";
help += "Intersperses text with 👏\n";
help += "*!clap <text>*\n";

//** Command handlers

let commandHandlers = {};

// Lists the available images.
commandHandlers.clap = function (message, args) {

  // Trim trailing and leading whitespace, replace two or more spaces with
  // one space, split into words, and join with clap emoji.
  message.channel.send(args.trim().replace(/  +/g, " ").split(" ").join(" 👏 "));

};

//** Module Exports

module.exports = {
  "help": help,
  "commandHandlers": commandHandlers
};
