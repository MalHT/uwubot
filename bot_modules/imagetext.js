/**
 * Images with text on them, you know, for making funny meme pics.
 */

const Discord = require("discord.js");
const botConfig = require("../config.json");
const serverConfig = require("../server_config.js");
const fs = require("fs");
const spawn = require("cross-spawn");
const tmp = require("tmp");

let help = "**Images With Text**\n";
help += "Appropriately frames the take.\n";
help += "*!listimages* - shows available images.\n";
help += "*!im <image> <text>* - puts <text> on <image>.\n";

// List of all available images
// Images live in images/.
// file is the image's filename.
// size is the size of the text label.
// size should be of the form "WxH".
// offset is the position of the label's top left corner.
// offset should be of the form "+X+Y".
// TODO Consider reading this from a file or something instead of hardcoding it.
// TODO Maybe make this per-server? I'm too bad to understand how !pasta does it.
const images = {
	dril: {
		// the dril template is a bit more complicated than the other ones
		template: "dril",
		font: "HelveticaNeue-Regular.ttf",
		size: "1159x",
		offset: "0",
		pointSize: "56",
		emojiPointSize: "150",
		align: "center",
		bgColor: "white",
		fgColor: "black"
	},
	jesus: {
		template: "jesus.png",
		font: "HelveticaNeue-Regular.ttf",
		size: "222x179",
		offset: "+147+114",
		pointSize: "40",
		emojiPointSize: "120",
		align: "center",
		bgColor: "white",
		fgColor: "black"
	},
	google: {
		template: "google.png",
		font: "HelveticaNeue-Regular.ttf",
		size: "300x93",
		offset: "+376+505",
		pointSize: "32",
		emojiPointSize: "84",
		align: "west",
		bgColor: "white",
		fgColor: "black"
	},
	verrit: {
		template: "verrit.png",
		font: "PTSansNarrow-Bold.ttf",
		size: "1710x564",
		offset: "+276+234",
		pointSize: "90",
		emojiPointSize: "250",
		align: "west",
		bgColor: "transparent",
		fgColor: "#232323"
	},
	pa: {
		// Presidential Alert template, follows many of the same rules as the dril one.
		template: "pa",
		font: "SF-Pro-Text-Regular.otf",
		size: "1030x",
		offset: "0",
		pointSize: "32",
		emojiPointSize: "32",
		align: "center",
		bgColor: "rgb(254,254,254)",
		fgColor: "rgb(50,50,50)"
	}
};

let emojiList = require("./imagetext/discord_emoji.json");

//** Command handlers

let commandHandlers = {};

// Lists the available images.
commandHandlers.listimages = function (message, args) {
	message.channel.send("Available images: `" + Object.keys(images).join(", ") + "`");
};

commandHandlers.im = function (message, args) {
	// Complain if we didn't get a command.
	if (args === "") {
		// TODO Make this message less unixy.
		message.channel.send("Usage: !im <image> <text>");
		return;
	}

	let words = args.split(" "); // Split the args into words.
	let command = words.splice(0,1)[0].toLowerCase(); // Remove the first word.
	let messageText = words.join(" ");

	// use 200 as a reasonable default for maximum message length
	if (messageText.length > 200) {
		message.channel.send("That message is too long!");
		return;
	}

	// Complain if we didn't get a valid command.
	if (!(command in images)) {
		message.channel.send("Couldn't find that image!");
		return;
	}

	var imgMeta = images[command];
	return sendImage(messageText, imgMeta, message.channel);
};

function sendImage(text, imgMeta, channel) {
	let tmpDir     = "bot_modules/imagetext/tmp/";
	let template   = `bot_modules/imagetext/${imgMeta.template}` ;
	let font       = `bot_modules/imagetext/fonts/${imgMeta.font}`;
	let emojiFont  = "bot_modules/imagetext/fonts/NotoEmoji-Regular.ttf";
	let pointSize  = imgMeta.pointSize;
	let emojiSize  = imgMeta.emojiPointSize;
	let size       = imgMeta.size;
	let offset     = imgMeta.offset;
	let align      = imgMeta.align;
	let background = imgMeta.bgColor;
	let fill       = imgMeta.fgColor;

	if (!fs.existsSync(tmpDir)) {
		fs.mkdirSync(tmpDir);
	}

	// generate random filename in the tmp/ directory
	var tempFile = tmp.fileSync({ dir: tmpDir });

	if (text.length < 16 && emojiList.includes(text)) {
		font = emojiFont;
		pointSize = emojiSize;
	}

	try {
		let imCmd = "convert";
		let imArgs = [template, "-background", background, "-fill", fill, "-font", font, "-pointsize", pointSize, "-gravity", align, "-size", size, `caption:${text}`, "-geometry", offset, "-gravity", "northwest", "-composite", tempFile.name]

		// if this is the dril or pa template, use different imagemagick arguments
		if (imgMeta.template === "dril") {
			let templateTop    = "bot_modules/imagetext/dril_top.png";
			let templateBottom = "bot_modules/imagetext/dril_bottom.png";
			imArgs = [templateTop, "-background", background, "-fill", fill, "-font", font, "-pointsize", pointSize, "-size", size, `caption:${text}`, "-gravity", align, templateBottom, "-append", tempFile.name];
		} else if (imgMeta.template === "pa") {
			let templateTop    = "bot_modules/imagetext/pa_top.png";
			let templateBottom = "bot_modules/imagetext/pa_bottom.png";
			imArgs = [templateTop, "-background", background, "-fill", fill, "-font", font, "-kerning", "-0.3", "-interline-spacing", "2", "-pointsize", pointSize, "-size", size, `caption:${text}`, "-gravity", align, templateBottom, "-append", tempFile.name];
		}

		console.log(imCmd, imArgs.join(" "));

		// execute imagemagick with the given arguments and get the result
		let result = spawn.sync(imCmd, imArgs);
		if (result.status !== 0) {
			// if the error code is not zero, something went wrong
			console.error("Image couldn't be generated:");
			console.error(result.output.toString("utf8"));

			// delete the temp file
			tempFile.removeCallback();
			return false;
		}

		let attachment = new Discord.Attachment(tempFile.name, "dril.png");

		channel.send("", attachment)
		.then(message => {
			console.log("Image macro sent!");

			// delete the temp file
			tempFile.removeCallback();
		})
		.catch(console.error);

		return true;
	} catch(error) {
		// delete the temp file
		tempFile.removeCallback();
	}

}

//** Module Exports

module.exports = {
	"help": help,
	"commandHandlers": commandHandlers
};

let scriptName = __filename.split(/[\\/]/).pop().split(".").shift();
console.info(`${scriptName} module loaded.`);