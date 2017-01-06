const fs = require("fs");

let configCache = {};

let functions = {};

/**
 * Creates a config file for a server if it doesn't exist, with id and last known name. If the config file for the server does exist, update the last known name.
 */
functions.initialiseServerConfig = function (guild, callback) {
  
  // Attempt to open the config file for this server

  fs.readFile("./server_config/" + guild.id + ".json", "utf8", function(err, data) {
    
    if (err && err.code === "ENOENT") {
      
      // Need to create config file because it doesn't exist yet.
      
      writeInitialConfig(guild, function (err) {});
      
    } else if (!err) {
      
      // File exists and is opened. Need to update friendly name.
      
      let parsedFile = JSON.parse(data);

      if (parsedFile.lastKnownName !== guild.name) {

        console.log("Updated last known name for server id " + guild.id);
        
        parsedFile.lastKnownName = guild.name;
        
        fs.writeFile('./server_config/' + guild.id + '.json', JSON.stringify(parsedFile), function (err) {

          if (err) { console.log(err) };

        });

      }
      
    } else {
      
      // An unexpected read error occurred.
      
      console.log(err);
      
      callback(false);
      
    }
    
  });

}

let writeInitialConfig = function (guild, callback) {
  
    // Initial config file contains id (essential), lastKnownName (useful for humans editing config), and blank moduleConfig (for convenience)
    let initialConfig = {
      id: guild.id,
      lastKnownName: guild.name,
      moduleConfig: {}
    };

    // Save initial config file
    fs.writeFile('./server_config/' + guild.id + '.json', JSON.stringify(initialConfig), function (err) {
      if (err) {

        console.log(err);

        callback(err);
        
      } else {

        callback();

      }

    });
  
}

functions.getServerConfig = function (guildId, callback) {
  
  if (configCache[guildId]) {
    
    callback(configCache[guildId]);
    
  } else {
  
    fs.readFile("./server_config/" + guild.id + ".json", "utf8", function(err, data) {

      if (err) {

        console.log(err);

        callback(false);

      } else {

        try {

          let parsedFile = JSON.parse(data);

          configCache[guildId] = parsedFile;
          
          callback(parsedFile);

        } catch (e) {

          console.log(e);

          callback(false);

        }

      }

    });
    
  }
  
}

functions.writeServerConfig = function (guildId, config, callback) {
  
}

module.exports = functions;