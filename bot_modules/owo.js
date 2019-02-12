/**
 * OWO - H-hewwo???
 */

let botConfig = require("../config.json");
let serverConfig = require("../server_config.js");

let help = "**OWO**\n";
help += "H-hewwo???\n";
help += "*!owo* <message> - Pwease owo wesponsibwy >w<\n";

//** Command handlers
let commandHandlers = {};

var faces = ["(・`ω´・)",";;w;;","owo","UwU",">w<","^w^"];

commandHandlers.owo = function (message, args) {
	if (!message.guild) {
		message.channel.send("This command must be run in a server.");
		return false;
	}

	var text = args;

	text = text.replace(/(?:r|l)/g, "w");
	text = text.replace(/(?:R|L)/g, "W");
	text = text.replace(/n([aeiou])/g, 'ny$1');
	text = text.replace(/N([aeiou])/g, 'Ny$1');
	text = text.replace(/N([AEIOU])/g, 'Ny$1');
	text = text.replace(/ove/g, "uv");
	text = text.replace(/\!+/g, " "+ faces[Math.floor(Math.random()*faces.length)]+ " ");

	message.channel.send(text);
};

//** Module Exports
module.exports = {
	"help": help,
	"commandHandlers": commandHandlers
};

let scriptName = __filename.split(/[\\/]/).pop().split(".").shift();
console.info(`${scriptName} module loaded.`);