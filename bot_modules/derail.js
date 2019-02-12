/**
 * DERAIL - In case of excessively intense conversation, posts a random Neil Cicierega song
 */

let botConfig = require("../config.json");
let serverConfig = require("../server_config.js");
let songList = require("./derail/songs.json");

let help = "**Derail**\n";
help += "In case of excessively intense conversation, posts a random Neil Cicierega song.\n";
help += "*!derail*.\n";

//** Command handlers
let commandHandlers = {};

commandHandlers.derail = function (message, args) {
	var choose = songList[Math.floor(Math.random() * songList.length)];
	message.channel.send(choose);
};

//** Module Exports
module.exports = {
	"help": help,
	"commandHandlers": commandHandlers
};

let scriptName = __filename.split(/[\\/]/).pop().split(".").shift();
console.info(`${scriptName} module loaded.`);