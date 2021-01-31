/**
 * RATIONAL - Generates Rational Skeptic YouTube names
 */

const serverConfig = require("../serverConfig.js");

let helpStrings = [
	"**Rational**",
	"  *Generates Rational Skeptic YouTube names*",
	"  Usage:",
	"    `!rational`"
];
let help = helpStrings.join("\n");

//** Actual functions
function getRandom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

//** Command handlers
let commandHandlers = {};

commandHandlers.rational = function(message, args) {
	serverConfig.getServerConfig(message.guild.id).then(function(config) {
		if (!("rational" in config.moduleConfig)) {
			console.error("Malfunction in rational module: No dictionary entries found.");
			return; // this doesn't actually return from the function, just from this .then()
		}

		let animals = config.moduleConfig.rational.animals;
		let prefixes = config.moduleConfig.rational.prefixes;

		let rationalWord = getRandom(prefixes);
		let alliterativeThings = [];

		animals.forEach(function(elem) {
			if (elem.startsWith(rationalWord[0])) {
				alliterativeThings.push(elem)
			}
		});

		if (alliterativeThings.length == 0) {
			alliterativeThings = animals;
		}

		let rationalName = rationalWord + " " + getRandom(alliterativeThings);
		message.channel.send(rationalName);
	})
	.catch(function(error) {
		console.error("Something went wrong in the rational module:");
		console.error(error);
	});
};

//** Module Exports
module.exports = {
	"help": help,
	"commandHandlers": commandHandlers
};

let scriptName = __filename.split(/[\\/]/).pop().split(".").shift();
console.info(`${scriptName} module loaded.`);