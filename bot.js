const Discord = require('discord.js');
const client = new Discord.Client();

// Modules

var modules = {};

modules.emojitext = require('./bot_modules/emojitext.js');
modules.autoroles = require('./bot_modules/autoroles.js');

var help = "**uwubot** version whatever\n";
help += "\n";

var commandHandlers = {};

for (var module in modules) {
    
  if (modules[module].help) {
        
    help += modules[module].help;
    
  }
  
  if (modules[module].commandHandlers) {
    
    Object.assign(commandHandlers, modules[module].commandHandlers);
    
  }
  
};

// Config file

var config = require('./config.json');

// Debug message for on ready
client.on('ready', () => {
  console.log('uwu');
});

// On message, process commands
client.on('message', message => {
  
  if (message.content) {
  
    var command = message.content.match(/^\!\w+/);

    if (command) {
      
      //** Process command text and arguments
      
      // commandText is the command without the !
      var commandText = command[0].substr(1);
      
      var commandArgs = message.content.replace(command[0], '');
      
      // Remove leading space from arguments
      if (commandArgs) {
        commandArgs = commandArgs.substr(1);
      }
      
      //** Pass commands onwards
      
      for (var commandHandlerName in commandHandlers) {
        
        if (commandText === commandHandlerName) {
          
          commandHandlers[commandHandlerName](message, commandArgs);
          
        }
        
      }
      
      if (commandText === "help") {
        
        message.channel.sendMessage(help);
        
      }
      
    }
    
  };
  
});

client.login(config.apikey);