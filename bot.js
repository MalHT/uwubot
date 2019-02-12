const Discord = require('discord.js');
const client = new Discord.Client();

const serverConfig = require('./server_config.js');

// Modules
let modules = {};
modules.unicode = require('./bot_modules/unicode.js');
modules.animals = require('./bot_modules/animals.js');
modules.copypasta = require('./bot_modules/copypasta.js');
modules.rationals = require('./bot_modules/rationals.js');
modules.imagetext = require('./bot_modules/imagetext.js');

const { version } = require("./package.json");

let help = `**uwubot** version ${version}\n`;
help += "\n";

let commandHandlers = {};
for (let module in modules) {
	if (modules[module].help) {
		help += modules[module].help;
	}

	if (modules[module].commandHandlers) {
		Object.assign(commandHandlers, modules[module].commandHandlers);
	}
};

// Config file
let botConfig = require('./config.json');

// Debug message for on ready
client.on('ready', () => {
	// Print startup console header
	console.log(String.raw `  __  ___      ____  ____        __ `);
	console.log(String.raw ` / / / / | /| / / / / / /  ___  / /_`);
	console.log(String.raw `/ /_/ /| |/ |/ / /_/ / _ \/ _ \/ __/`);
	console.log(String.raw `\____/ |__/|__/\____/____/\___/\__/ `);
	console.log();

	// Create or update configuration files for each server the bot is present in.
	client.guilds.forEach (function (guild) {
		serverConfig.initialiseServerConfig(guild);
	});

	// Print server connection status
	if (client.guilds.size === 1)
		console.log(`Connected to ${client.guilds.size} server.`);
	else
		console.log(`Connected to ${client.guilds.size} servers.`);

	// Set game status
	client.user.setActivity("!uwuhelp\nhttps://github.com/MalHT/uwubot");
});

// On message, process commands
client.on('message', message => {
	if (message.content) {
		let command = message.content.match(/^\!\w+/);

		if (command && message.author.bot == false) {
			//** Process command text and arguments

			// commandText is the command without the !
			let commandText = command[0].substr(1);
			let commandArgs = message.content.replace(command[0], '');

			// Remove leading space from arguments
			if (commandArgs) {
				commandArgs = commandArgs.substr(1);
			}

			//** Pass commands onwards
			for (let commandHandlerName in commandHandlers) {
				if (commandText === commandHandlerName) {
					commandHandlers[commandHandlerName](message, commandArgs);
				}
			}

			if (commandText === "uwuhelp") {
				message.channel.send(help);
			}
		}
	};
});

client.login(botConfig.apikey);
