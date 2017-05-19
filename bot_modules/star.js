/**
 * ANIMALS - Gets important pictures of important animals
 */

const Discord = require('discord.js');

const dateFormat = require("dateformat");

let botConfig = require("../config.json");

let serverConfig = require("../server_config.js");

let help = "**Starring**\n";
help += "Saves posts to an archive channel.\n";
help += "Use a custom emoji.\n";
help += "Alternatively: *!star <message id>* - this is necessary when starring a message that was posted when the bot was offline.\n";

//** React handlers

let reactHandlers = {};

reactHandlers.starEmoji = function (react) {
  
  serverConfig.getServerConfig(react.message.guild.id, function (config) {
    
    if (config.moduleConfig && config.moduleConfig.star && config.moduleConfig.star.starChannel && config.moduleConfig.star.starEmoji) {
      
      if (react.emoji.id === config.moduleConfig.star.starEmoji) {
        
        let channels = react.message.guild.channels;
        
        if (channels.get(config.moduleConfig.star.starChannel)) {
          
          let starChannel = channels.get(config.moduleConfig.star.starChannel);
                                        
          starChannel.sendEmbed(makeRichQuote(react.message));
          
        }
        
      }
      
    }
    
  });
  
};

//** Command handlers

let commandHandlers = {};

commandHandlers.star = function (message, args) {
  
  message.channel.fetchMessage(args)
    .then(function (fetchedMessage) {
  
      serverConfig.getServerConfig(message.guild.id, function (config) {

        let channels = message.guild.channels;

            if (channels.get(config.moduleConfig.star.starChannel)) {

              let starChannel = channels.get(config.moduleConfig.star.starChannel);

              starChannel.sendEmbed(makeRichQuote(fetchedMessage));

            }

      });
  
    })
    .catch(function () {
    
      message.reply("sorry, that message wasn't found. Are sure you're in the correct channel?");
      
    });
    
};

let makeRichQuote = function (message) {
  
  let embed = new Discord.RichEmbed();
  
  let authDate = Date.parse(message.createdTimestamp);
  
  embed.setAuthor(message.author.username, message.author.avatarURL);
  embed.setDescription(message.content);
  
  if (message.attachments) {
    
    let attachment = message.attachments.first();
    
    if (attachment && attachment.url && (attachment.url.toLowerCase().endsWith("png") || attachment.url.toLowerCase().endsWith("gif") || attachment.url.toLowerCase().endsWith("jpg") || attachment.url.toLowerCase().endsWith("jpeg") || attachment.url.toLowerCase().endsWith("svg"))) {
      
      embed.setImage(attachment.url);
      
    }
    
    
    
  }
  
  
  embed.setFooter(dateFormat(authDate));
  
  return embed;
  
};

//** Module Exports

module.exports = {
  "help": help,
  "commandHandlers": commandHandlers,
  "reactHandlers": reactHandlers
};