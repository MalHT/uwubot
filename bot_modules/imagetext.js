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
// width and height are the dimensions of the text label.
// offset is the position of the label's top left corner.
// offset should be of the form "+X+Y".
// TODO Consider reading this from a file or something instead of hardcoding it.
// TODO Maybe make this per-server? I'm too bad to understand how !pasta does it.
const images = {
  jesus: {
    file: "jesus.png",
    width: 222,
    height: 179,
    offset: "+147+114"
  },
  google: {
    file: "google.png",
    width: 316,
    height: 93,
    offset: "+360+505"
  }
};

// The font that is used for the text label.
// List available fonts with `convert -list font`.
// TODO Choose a better font with emoji support.
const font = "Noto-Sans-UI-Regular";

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
  var command = words.splice(0,1); // Remove the first word.

  // Complain if we didn't get a valid command.
  if (!(command in images)) {
    message.channel.send("Couldn't find that image!");
    return;
  }

  var image = images[command]; // Get the image using the first word.
  sendImage(image, words.join(" "), message.channel);

};

function sendImage(image, text, channel) {

  let tmpfile = "tmp-" + Math.random().toString(36).substr(2);

  // Generate the label and save it to file.
  // I would pass a stream directly to composite(), but it only supports files.
  im(image.width, image.height).in("-background").in("transparent")
  .gravity("Center").font(font).out("caption:"+text)
  .write("/tmp/" + tmpfile + ".png", function (err) {

    // Log the error and exit if something went wrong when writing the label.
    if (err) {
      console.log(err);
      return;
    }

    // TODO Find a better way to unlink the label after sending.
    // then() with a _ feels very hacky.
    // Also, calling unlink without a callback is deprecated.
    console.log("imagetext/" + image.file);
    channel.send("",new Discord.Attachment(im("bot_modules/imagetext/" + image.file).composite("/tmp/" + tmpfile + ".png").geometry(image.offset).stream(), "file.png"))
    .then(_ => fs.unlink("/tmp/" + tmpfile + ".png"));

  });
};

//** Module Exports

module.exports = {
  "help": help,
  "commandHandlers": commandHandlers
};
