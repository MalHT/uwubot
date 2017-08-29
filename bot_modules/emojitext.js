/**
 * EMOJITEXT - Spits out regional indicators and (maybe) other such obnoxious "emoji" characters as replacement for text
 */

let help = "**Emojitext**\n";
help += "Converts given text into emoji characters.\n";
help += "*!ri <message>* - prints <message> using emoji characters.\n";


//** Command handlers

let commandHandlers = {};

commandHandlers.ri = function (message, args) {

//    // Remove non alphanumeric characters
//    let messageContent = message.content.replace(/[\W_\!\?]+/g," ");

  let messageContent = args;

  message.channel.send(indicatorize(messageContent));

};

//** Functions for ri command

let indicatorize = function (text) {

  text = text.toLowerCase();

  text = [...text].join(' ');

  let normalAlphabet =  'abcdefghijklmnopqrstuvwxyz!?$+-1234567890*#'.split('');

  let indicatorAlphabet = [
    String.fromCodePoint(0x1f1e6),
    String.fromCodePoint(0x1f1e7),
    String.fromCodePoint(0x1f1e8),
    String.fromCodePoint(0x1f1e9),
    String.fromCodePoint(0x1f1ea),
    String.fromCodePoint(0x1f1eb),
    String.fromCodePoint(0x1f1ec),
    String.fromCodePoint(0x1f1ed),
    String.fromCodePoint(0x1f1ee),
    String.fromCodePoint(0x1f1ef),
    String.fromCodePoint(0x1f1f0),
    String.fromCodePoint(0x1f1f1),
    String.fromCodePoint(0x1f1f2),
    String.fromCodePoint(0x1f1f3),
    String.fromCodePoint(0x1f1f4),
    String.fromCodePoint(0x1f1f5),
    String.fromCodePoint(0x1f1f6),
    String.fromCodePoint(0x1f1f7),
    String.fromCodePoint(0x1f1f8),
    String.fromCodePoint(0x1f1f9),
    String.fromCodePoint(0x1f1fa),
    String.fromCodePoint(0x1f1fb),
    String.fromCodePoint(0x1f1fc),
    String.fromCodePoint(0x1f1fd),
    String.fromCodePoint(0x1f1fe),
    String.fromCodePoint(0x1f1ff),
    String.fromCodePoint(0x2757),
    String.fromCodePoint(0x2753),
    String.fromCodePoint(0x1f4b2),
    String.fromCodePoint(0x2795),
    String.fromCodePoint(0x2796),
    "\u0031\u20E3",
    "\u0032\u20E3",
    "\u0033\u20E3",
    "\u0034\u20E3",
    "\u0035\u20E3",
    "\u0036\u20E3",
    "\u0037\u20E3",
    "\u0038\u20E3",
    "\u0039\u20E3",
    "\u0030\u20E3",
    "\u002A\u20E3",
    "\u0023\u20E3"
  ];

  normalAlphabet.forEach(function (element, index) {
    
    text = text.replace(new RegExp(escapeRegExp(normalAlphabet[index]), 'g'), indicatorAlphabet[index]);

  });

  return (text);

};

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

//** Module Exports

module.exports = {
  "help": help,
  "commandHandlers": commandHandlers
};
