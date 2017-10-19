/**
 * Images with text on them, you know, for making funny meme pics.
 */

let Discord = require("discord.js");
let botConfig = require("../config.json");
let serverConfig = require("../server_config.js");
let im = require("gm").subClass({imageMagick: true});
let fs = require("fs");

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
    file: "dril.png",
    size: "1189x285",
    offset: "+41+162",
    align: "west",
    bgcolor: "white",
    fgcolor: "black"
  },
  jesus: {
    file: "jesus.png",
    size: "222x179",
    offset: "+147+114",
    align: "center",
    bgcolor: "white",
    fgcolor: "black"
  },
  verrit: {
    file: "verrit.jpg",
    size: "1710x564",
    offset: "+276+234",
    align: "west",
    bgcolor: "transparent",
    fgcolor: "black"
  }
};

// The font that is used for the text label.
// List available fonts with `convert -list font`.
// TODO Choose a better font with emoji support.
const font = "DejaVu-Sans";

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

  // Images can take a long time to generate.
  // TODO Decide if we want a maximum text length.
  if (args.length > 200) {
    message.channel.send("That text is too long! (" + args.length + ")");
    return;
  }

  var words = args.split(" "); // Split the args into words.
  var command = words.splice(0,1)[0].toLowerCase(); // Remove the first word.

  // Complain if we didn't get a valid command.
  if (!(command in images)) {
    message.channel.send("Couldn't find that image!");
    return;
  }

  var image = images[command]; // Get the image using the first word.
  sendImage(image, words.join(" "), message.channel);

};

function sendImage(image, text, channel) {
  var attachment = new Discord.Attachment(im("images/" + image.file)
  .gravity(image.align).background(image.bgcolor).stroke(image.fgcolor)
  .in("-size").in(image.size).out("caption:" + text).in("images/" + image.file)
  .out("+swap").gravity("northwest").geometry(image.offset).out("-composite")
  .stream());

  channel.send("",attachment);

};

//** Module Exports

module.exports = {
  "help": help,
  "commandHandlers": commandHandlers
};
