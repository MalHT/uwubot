/**
 * OWO - H-hewwo???
 */

let botConfig = require("../config.json");
let serverConfig = require("../server_config.js");

let helpStrings = [
	"**OwO**",
	"  *H-hewwo???*",
	"  Usage:",
	"    `!uwu <message>` - Pwease `!uwu` wesponsibwy >w<",
	"    `!owo <message>` - What's this?? (like `!uwu`, but **more**)"
];
let help = helpStrings.join("\n");

function randomInt(min, max) { // min and max inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//** Command handlers
let commandHandlers = {};

function uwu(text, replaceOnly = false) {
	let faces = ["(・`ω´・)",";;w;;","uwu","UwU","owo",">w<","^w^"];

	text = text.replace(/(?:r|l)/g, "w");
	text = text.replace(/(?:R|L)/g, "W");
	text = text.replace(/n([aeiou])/g, 'ny$1');
	text = text.replace(/N([aeiou])/g, 'Ny$1');
	text = text.replace(/N([AEIOU])/g, 'Ny$1');
	text = text.replace(/ove/g, "uv");

	if(!replaceOnly)
		text = text.replace(/\!+/g, " "+ faces[Math.floor(Math.random()*faces.length)]+ " ");

	return text;
}

function owo(text, replaceOnly = false) {
	let prefixes = ["OwO ", "H-hewwo?? ", "Huohhhh. ", "Haiiii! ", "UwU ", "OWO ", "HIIII! ", "<3 "];
	let suffixes = [" :3", " UwU", " ʕʘ‿ʘʔ", " >_>", " ^_^", "..", " Huoh.", " ^-^", " ;_;", " ;-;", " xD", " x3", " :D", " :P", " ;3", " XDDD", ", fwendo", " ㅇㅅㅇ", " (人◕ω◕)", "（＾ｖ＾）", " Sigh.", " >_<"];
	let replaces = {
		"r":    "w",
		"l":    "w",
		"R":    "W",
		"L":    "W",
		"ow":   "OwO",
		"no":   "nu",
		"has":  "haz",
		"have": "haz",
		"you":  "uu",
		"the ": "da ",
	};

	text = uwu(text, true);

	for (var key in replaces) {
		text = text.replace(new RegExp(key, "g"), replaces[key]);
	}

	if (Math.random() < 0.8) {
		let prefixIdx = randomInt(0, prefixes.length);
		text = prefixes[prefixIdx] + text;
	}

	if (Math.random() < 0.8) {
		let suffixIdx = randomInt(0, suffixes.length);
		text = text + suffixes[suffixIdx];
	}

	return text;
}

commandHandlers.uwu = function(message, args) {
	let text = uwu(args);

	message.channel.send(text);
};

commandHandlers.owo = function(message, args) {
	let text = owo(args);

	message.channel.send(text);
}

//** Module Exports
module.exports = {
	"help": help,
	"commandHandlers": commandHandlers
};

let scriptName = __filename.split(/[\\/]/).pop().split(".").shift();
console.info(`${scriptName} module loaded.`);