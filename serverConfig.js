const fs = require("fs");
const deepmerge = require("deepmerge");

const botConfig = require("./config.json");
const moduleConfig = require("./bot_modules/moduleConfig.json");
let configCache = {};
let functions = {};

/**
 * Creates a config file for a server if it doesn't exist, with id and last known name. If the config file for the server does exist, update the last known name.
 */
functions.initialiseServerConfig = function(guild) {
	return new Promise(function(resolve, reject) {
		// Attempt to open the config file for this server
		fs.readFile("./server_config/" + guild.id + ".json", "utf8", function(err, data) {
			if (err && err.code === "ENOENT") {
				// Need to create config file because it doesn't exist yet.
				writeInitialConfig(guild).then(resolve).catch(reject);
			} else if (!err) {
				// File exists and is opened. Need to update friendly name.
				let parsedFile = JSON.parse(data);

				if (parsedFile.lastKnownName !== guild.name) {
					console.log(`Updated last known name for server id ${guild.id}: ${parsedFile.lastKnownName} → ${guild.name}`);
					parsedFile.lastKnownName = guild.name;
					configCache[guild.id] = parsedFile;
					fs.writeFile("./server_config/" + guild.id + ".json", JSON.stringify(parsedFile), function (err) {
						if (err)
							reject(err);
						else
							resolve();
					});

				}
			} else {
				// An unexpected read error occurred.
				reject(err);
			}
		});
	});
};

/**
 * Deletes a server config file
 */
functions.deleteServerConfig = function(guildID) {
	return new Promise(function(resolve, reject) {
		// Attempt to delete the config file for this server
		fs.unlink("./server_config/" + guildID + ".json", (err) => {
			if (err)
				reject(err);
			else
				resolve();
		});
	});
};

/**
 * Helper function to write the initial config file, using template
 */
let writeInitialConfig = function(guild) {
	// Initial config file contains id (essential), lastKnownName (useful for humans editing config), and blank moduleConfig (for convenience)
	let initialConfig = {
		id: guild.id,
		lastKnownName: guild.name,
		moduleConfig: {}
	};

	return new Promise(function(resolve, reject) {
		// Save initial config file
		fs.writeFile("./server_config/" + guild.id + ".json", JSON.stringify(initialConfig), function (err) {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

/**
 * Get config object for a given server.
 *
 * Merges with overall server config also - so per-server config options will overwrite global config.
 */
functions.getServerConfig = function(guildID) {
	return new Promise(function(resolve, reject) {
		if (configCache[guildID]) {
			resolve(configCache[guildID]);
			return;
		} else {
			let mergedConfig = Object.assign({}, botConfig);
			mergedConfig["moduleConfig"] = moduleConfig;

			fs.readFile("./server_config/" + guildID + ".json", "utf8", function(err, data) {
				if (err) {
					// no server config exists, return config without overrides
					resolve(mergedConfig);
					return;
				}

				try {
					let parsedFile = JSON.parse(data);
					mergedConfig = deepmerge(mergedConfig, parsedFile);
					configCache[guildID] = mergedConfig;
					resolve(mergedConfig);
					return;
				} catch (e) {
					// file was read successfully but couldn't be parsed
					// let the user know
					reject(e);
					return;
				}
			});
		}
	});
};

module.exports = functions;
