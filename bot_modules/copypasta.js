/**
 * COPYPASTA - Sends only the best and most rational copypastas
 */

let botConfig = require("../config.json");
let serverConfig = require("../server_config.js");

let helpStrings = [
	"**Copypastas**",
	"  *Sends only the best and most rational copypastas*",
	"  Usage:",
	"    `!pasta` - Shows available pastas",
	"    `!pasta <pastaname>` - Posts delicious pasta"
];
let help = helpStrings.join("\n");

//** Command handlers
let commandHandlers = {};

commandHandlers.pasta = function(message, args) {
	serverConfig.getServerConfig(message.guild.id).then(function(config) {
		if (args === "") {
			message.channel.send("Usage: !pasta <pasta>");
			let pastaMessage = ["Available Pastas:", "```"];
			Object.keys(config.moduleConfig.copypasta).forEach(function(element, index) {
				pastaMessage.push("* " + element);
			});
			pastaMessage.push("```");

			message.channel.send(pastaMessage.join("\n"));
			return;
		}

		if (Object.keys(config.moduleConfig.copypasta).indexOf(args) !== -1) {
			let pasta = config.moduleConfig.copypasta[args];
			message.channel.send(pasta);
		} else {
			message.channel.send("Couldn't find that pasta!");
		};
	})
	.catch(function(error) {
		message.channel.send("There aren't any copypastas configured for this server. Sorry :(");
		console.error("Couldn't load any copypastas: " + error);
	});
};

commandHandlers.listpastas = function(message, args) {
	if (!message.guild) {
		message.channel.send("This command must be run in a server.")
		return false;
	}

	getPastas(message.guild.id, function (pastas) {
		if (typeof pastas === "object" && Object.keys(pastas).length > 0) {
			pastaMessage = "Pastas:\n";

			Object.keys(pastas).forEach(function (element, index) {
				pastaMessage += element;
				if (index < Object.keys(pastas).length - 1) {
					pastaMessage+= ", ";
				}
			});

			message.channel.send(pastaMessage + "```");
		} else {
			message.channel.send("There aren't any copypastas configured for this server. Sorry :(");
		}
	});
};

let getPastas = function(guildId, callback) {
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

let scriptName = __filename.split(/[\\/]/).pop().split(".").shift();
console.info(`${scriptName} module loaded.`);