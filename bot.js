const Discord = require("discord.js");
const client = new Discord.Client();
const path = require("path");
const fs = require("fs");

const { version } = require("./package.json");
const serverConfig = require("./server_config.js");

// Setup
require("console-stamp")(console, "[dd.mm.yy HH:MM:ss.l]");

/* PERMISSIONS 
 * Integer: 322624
 * View Channels
 * Send Messages
 * Manage Messages
 * Embed Links
 * Attach Files
 * Use External Emojis
 * Add Reactions
 */

var banner = String.raw `
  __  __       __  ____        __
 / / / /    __/ / / / /  ___  / /_
/ /_/ / |/|/ / /_/ / _ \/ _ \/ __/
\____/|_____/\____/____/\___/\__/ `;

// Modules
let modules = {};
modules.unicode = require("./bot_modules/unicode.js");
modules.animals = require("./bot_modules/animals.js");
modules.copypasta = require("./bot_modules/copypasta.js");
modules.rationals = require("./bot_modules/rationals.js");
modules.imagetext = require("./bot_modules/imagetext.js");
modules.derail = require("./bot_modules/derail.js");
modules.owo = require("./bot_modules/owo.js");

let helpStrings = [
	`__**uwubot** version ${version}__`
];
let commandHandlers = {};
for (let module in modules) {
	if (modules[module].help) {
		helpStrings.push(modules[module].help);
	}

	if (modules[module].commandHandlers) {
		Object.assign(commandHandlers, modules[module].commandHandlers);
	}
}
let help = helpStrings.join("\n");

// Config file
let botConfig = require("./config.json");

function botStats() {
	let stats = [];
	client.guilds.forEach(function (guild) {
		let embed = {
			author: {
				name: guild.name,
				icon_url: guild.iconURL
			},
			fields: [
				{
					name: "ID",
					value: guild.id
				},
				{
					name: "Members",
					value: guild.memberCount
				},
				{
					name: "Join Date",
					value: guild.joinedAt
				}
			],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: "This has been an uwubot service"
			}
		};

		if (guild.splashURL) {
			embed.thumbnail = {
				url: guild.splashURL
			};
		}

		stats.push({ embed: embed });
	});

	return stats;
}

client.on("guildCreate", async guild => {
	console.info(`New Server Joined: ${guild.name} (${guild.id})`);
	serverConfig.initialiseServerConfig(guild);
});

client.on("guildDelete", async guild => {
	console.info(`Left Server: ${guild.name} (${guild.id})`);
	serverConfig.deleteServerConfig(guild.id);
});

// Executed when bot starts
client.on("ready", async () => {
	// Print startup banner and version
	console.info(`${banner}v${version}`);

	// Create or update configuration files for each server the bot is present in.
	client.guilds.forEach (function (guild) {
		if (guild.deleted)  {
			serverConfig.deleteServerConfig(guild.id);
		} else {
			serverConfig.initialiseServerConfig(guild);
		}
	});

	// Print server connection status
	if (client.guilds.size === 1)
		console.log(`Connected to ${client.guilds.size} server.`);
	else
		console.log(`Connected to ${client.guilds.size} servers.`);

	// Set game status
	client.user.setActivity("Bot Usage: type !uwuhelp\nhttps://github.com/SamusAranX/uwubot");
});

// Executed when a new message is received
client.on("message", async message => {
	if (message.author.bot)
		return;

	if (message.content) {
		let command = message.content.match(/^\!\w+/);

		if (command) {
			//** Process command text and arguments

			// commandText is the command without the !
			let commandText = command[0].substr(1);
			let commandArgs = message.content.replace(command[0], '');

			// Remove leading space from arguments
			commandArgs = commandArgs.trimStart();

			if (commandText === "uwuhelp") {
				// Allow !uwuhelp usage outside of servers
				message.channel.send(help);
			} else if (commandText === "uwuinfo" && botConfig.superUsers.includes(message.author.id) && message.guild === null) {
				// Allow me to see what servers uwubot has been added to
				message.author.send("**Joined Servers:**");
				botStats().forEach(function (stat) {
					message.author.send(stat);
				});
			} else {
				// Pass commands to bot modules
				for (let commandHandlerName in commandHandlers) {
					if (commandText === commandHandlerName) {
						if (!message.guild) {
							message.channel.send("This command must be run in a server.");
							return;
						}

						commandHandlers[commandHandlerName](message, commandArgs);
					}
				}
			}
		}
	};
});

client.on("error", async error => {
	if (error.code == "ECONNRESET") {
		console.info("Connection reset");
	} else {
		console.error(error.type, error.message);
	}
});

console.log("Logging in…");
client.login(botConfig.apiKey);