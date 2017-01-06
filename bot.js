const Discord = require('discord.js');
const client = new Discord.Client();

const serverConfig = require('./server_config.js');

// Modules

let modules = {};

modules.emojitext = require('./bot_modules/emojitext.js');
modules.autoroles = require('./bot_modules/autoroles.js');
modules.animals = require('./bot_modules/animals.js');

let help = "**uwubot** version whatever\n";
help += "\n";

let commandHandlers = {};

for (let module in modules) {
    
  if (modules[module].help) {
        
    help += modules[module].help;
    
  }
  
  if (modules[module].commandHandlers) {
    
    Object.assign(commandHandlers, modules[module].commandHandlers);
    
  }
  
};

// Config file

let botConfig = require('./config.json');

// Debug message for on ready
client.on('ready', () => {
  console.log('uwu');
  
  // Create or update configuration files for each server the bot is present in.
  
  client.guilds.forEach (function (guild) {
    
    serverConfig.initialiseServerConfig(guild);
    
  });  
  
  console.log("Connected to " + Object.keys(client.guilds).length + " server(s).");
  
});

// On message, process commands
client.on('message', message => {
  
  if (message.content) {
  
    let command = message.content.match(/^\!\w+/);

    if (command) {
      
      //** Process command text and arguments
      
      // commandText is the command without the !
      let commandText = command[0].substr(1);
      
      let commandArgs = message.content.replace(command[0], '');
      
      // Remove leading space from arguments
      if (commandArgs) {
        commandArgs = commandArgs.substr(1);
      }
      
      //** Pass commands onwards
      
      for (let commandHandlerName in commandHandlers) {
        
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

client.login(botConfig.apikey);