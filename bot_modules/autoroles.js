/**
 * AUTOROLES - Automatically assigns roles to people.
 */

var config = require("../config.json");

var managedRoles = [];

var help = "**Autoroles**\n";
help += "Automatically assigns roles to people.\n";
help += "*!listroles* - shows available roles.\n";
help += "*!giverole <role name>* - gives you a role.\n";
help += "*!removerole <role name>* - removes a role that you have been given.\n";

try {
  if (config.moduleConfig.autoroles.managedRoles[0]) {

    managedRoles = config.moduleConfig.autoroles.managedRoles;
    
  }
} catch (e) {
  console.log("No managed roles were detected for autoroles.");
}

//** Command handlers

var commandHandlers = {};

commandHandlers.listroles = function (message, arguments) {
  
  var rolesMessage = "";
  
  if (managedRoles.length > 0) {
  
    rolesMessage = "The following roles are managed by this bot:\n";

    managedRoles.forEach(function (element, index) {
      
      rolesMessage += element;
      
      if (index < managedRoles.length - 1) {
        
        rolesMessage += ", ";
        
      }
      
    });
  
  } else {
    
    rolesMessage = "There are currently no roles being managed by this bot :(";
    
  }
  
  message.member.sendMessage(rolesMessage);
  
};

commandHandlers.giverole = function (message, arguments) {
  
  // Check if requested role is in the list of managed roles 
  
  if (managedRoles.indexOf(arguments) !== -1) {
    
    let role = message.guild.roles.find("name", arguments);
    
    if (!message.member.roles.has(role.id)) {
      
      message.member.addRole(role).catch(function(e) {

        console.log(e);

        message.member.sendMessage("Something went wrong when trying to give you your role! Sorry - you should tell the bot administrator(s) about this.");
        
      });

      message.member.sendMessage("There you go! You have been given the requested role.");
      
    } else {
      
      message.member.sendMessage("You already have that role.");
      
    }
    
  } else {
    
    message.member.sendMessage("This is not a valid role that is managed by the bot.")
    
  }
  
};

commandHandlers.removerole = function(message, arguments) {
  
  // Check if requested role is in the list of managed roles 
  
  if (managedRoles.indexOf(arguments) !== -1) {
    
    let role = message.guild.roles.find("name", arguments);
    
    if (message.member.roles.has(role.id)) {
      
      message.member.removeRole(role).catch(function (e) {

        console.log(e);
        
        message.member.sendMessage("Something went wrong when trying to remove your role! Sorry - you should tell the bot administrator(s) about this.");
        
      });
        
      message.member.sendMessage("There you go! You have had the requested role removed.");
        
      
    } else {
      
      message.member.sendMessage("You don't have that role.");
      
    }
    
  } else {
    
    message.member.sendMessage("This is not a valid role that is managed by the bot.")
    
  }
  
};

//** Module Exports

module.exports = {
  "help": help,
  "commandHandlers": commandHandlers
};