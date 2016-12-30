const Discord = require('discord.js');
const client = new Discord.Client();

// Modules

var emojitext = require('./bot_modules/emojitext.js');
var autoroles = require('./bot_modules/autoroles.js');

// Config file

var config = require('./config.json');

// Debug message for on ready
client.on('ready', () => {
  console.log('uwu');
});

// On message, process commands
client.on('message', message => {
  
  if (message.content.startsWith('!ri ')) {

    message.content = message.content.substring(4);
    
    emojitext.regionalIndicators(message);

  }
  
});

client.login(config.apikey);