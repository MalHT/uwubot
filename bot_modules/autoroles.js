/**
 * AUTOROLES - Automatically assigns roles to people.
 */

let botConfig = require("../config.json");

let serverConfig = require("../server_config.js");

let help = "**Autoroles**\n";
help += "Automatically assigns roles to people.\n";
help += "*!listroles* - shows available roles.\n";
help += "*!giverole <role name>* - gives you a role.\n";
help += "*!removerole <role name>* - removes a role that you have been given.\n";

//** Command handlers

let commandHandlers = {};

commandHandlers.listroles = function (message, args) {
  
  // Check that it's not a PM
  if (!message.guild) {
    
    message.channel.send("This command must be run in a server.");
    
    return false;
    
  }
  
  let rolesMessage = "";
  
  getManagedRoles(message.guild.id, function (managedRoles) {
  
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

    message.member.send(rolesMessage);
    
  });
  
};

commandHandlers.giverole = function (message, args) {
  
  // Check that it's not a PM
  if (!message.guild) {
    
    message.channel.send("This command must be run in a server.");
    
    return false;
    
  }
  
  getManagedRoles(message.guild.id, function (managedRoles) {

    // Check if requested role is in the list of managed roles 

    if (managedRoles.indexOf(args) !== -1) {

      let role = message.guild.roles.find("name", args);

      if (!message.member.roles.has(role.id)) {

        message.member.addRole(role).catch(function(e) {

          console.log(e);

          message.member.send("Something went wrong when trying to give you your role! Sorry - you should tell the bot administrator(s) about this.");

        });

        message.member.send("There you go! You have been given the requested role.");

      } else {

        message.member.send("You already have that role.");

      }

    } else {

      message.member.send("This is not a valid role that is managed by the bot.")

    }
    
  });
  
};

commandHandlers.removerole = function(message, args) {
  
  // Check that it's not a PM
  if (!message.guild) {
    
    message.channel.send("This command must be run in a server.");
    
    return false;
    
  }
  
  getManagedRoles(message.guild.id, function (managedRoles) {
  
    // Check if requested role is in the list of managed roles 

    if (managedRoles.indexOf(args) !== -1) {

      let role = message.guild.roles.find("name", args);

      if (message.member.roles.has(role.id)) {

        message.member.removeRole(role).catch(function (e) {

          console.log(e);

          message.member.send("Something went wrong when trying to remove your role! Sorry - you should tell the bot administrator(s) about this.");

        });

        message.member.send("There you go! You have had the requested role removed.");


      } else {

        message.member.send("You don't have that role.");

      }

    } else {

      message.member.send("This is not a valid role that is managed by the bot.")

    }
    
  });
  
};

let getManagedRoles = function (guildId, callback) {
  
  serverConfig.getServerConfig(guildId, function (config) {
    
    if (config.moduleConfig && config.moduleConfig.autoroles && config.moduleConfig.autoroles.managedRoles) {
    
      callback(config.moduleConfig.autoroles.managedRoles);
      
    } else {
      
      callback([]);
      
    }
    
  });
  
};

//** Module Exports

module.exports = {
  "help": help,
  "commandHandlers": commandHandlers
};