const fs = require("fs");

let botConfig = require('./config.json');

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

};

/**
 * Helper function to write the initial config file, using template
 */
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
  
};

/**
 * Get config object for the given server.
 *
 * Merges with overall server config also - so per-server config options will overwrite global config.
 */
functions.getServerConfig = function (guildId, callback) {
  
  if (configCache[guildId]) {
    
    callback(mergeConfig(botConfig, configCache[guildId]));
    
  } else {
  
    fs.readFile("./server_config/" + guildId + ".json", "utf8", function(err, data) {

      if (err) {

        console.log(err);

        callback(false);

      } else {

        try {

          let parsedFile = JSON.parse(data);

          configCache[guildId] = parsedFile;
          
          callback(mergeConfig(botConfig, parsedFile));

        } catch (e) {

          console.log(e);

          callback(false);

        }

      }

    });
    
  }
  
};

/**
 * Helper function to merge two config objects
 */
let mergeConfig = function (globalConfig, serverConfig) {

  let mergedConfig = JSON.parse(JSON.stringify(globalConfig));

  if (serverConfig.moduleConfig) {

    for (let module in serverConfig.moduleConfig) {

      // If the global config already contains configuration of this module, and it's not empty
      if (mergedConfig.moduleConfig[module] && Object.keys(mergedConfig.moduleConfig[module]).length !== 0) {

        for (let moduleProperty in mergedConfig.moduleConfig[module]) {

          if (serverConfig.moduleConfig[module][moduleProperty]) {

            mergedConfig.moduleConfig[module][moduleProperty] = serverConfig.moduleConfig[module][moduleProperty];

          }

        }

      } else {

        mergedConfig.moduleConfig[module] = serverConfig.moduleConfig[module];

      }


    }

  }
  
  if (serverConfig.lastKnownName) {
    
    mergedConfig.lastKnownName = serverConfig.lastKnownName;
    
  }
  
  return mergedConfig;
  
};

functions.writeServerConfig = function (guildId, config, callback) {
  
};

module.exports = functions;