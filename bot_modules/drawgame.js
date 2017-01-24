/**
 * EMOJITEXT - Spits out regional indicators and (maybe) other such obnoxious "emoji" characters as replacement for text
 */

let help = "**Chatgames**\n";
help += "Some games to play together.\n";
help += "*!startgame draw* - starts drawing game.\n";
help += "*!startgame quips* - starts quip game.\n";

const submissionServer = require("./drawgame/server.js");

//** Running game information

let runningGames = {};

let usersInGames = {};

let channelsInGames = {};

//** Command handlers

let commandHandlers = {};

commandHandlers.newgame = function (message, args) {

  if (message.guild) {
    
    let game = {
      id: randomToken(),
      channelid: message.channel.id,
      channel: message.channel,
      players: {},
      posts: {},
      gametype: "draw",
      maxplayers: 8,
      acceptingplayers: true
    }
    
    game.players[message.member.id] = {
      token: randomToken(),
      user: message.member,
      owner: true
    };
    
    usersInGames[message.member.id] = game.id;
    
    channelsInGames[message.channel.id] = game.id;
    
    runningGames[game.id] = game;
    
    message.reply("has started a game in #" + message.channel.name + "! Type !joingame in this channel to take part!")
    
    message.channel.sendMessage("**" + game.gametype + "**" + " has started. These people are playing.").then(function (message) {
      
      game.posts["initial"] = message;
      
      message.edit("**" + game.gametype + "**" + " has started. These people are playing.\n" + printMembers(game));
      
    });
    
  } else {
    
    message.member.sendMessage("This command can only be run in a channel on a server.");
    
  }
  
};

commandHandlers.joingame = function (message, args) {
  
  if (message.guild) {
    
    if (channelsInGames[message.channel.id]) {
      
      let game = runningGames[channelsInGames[message.channel.id]];
      
      if (game.acceptingplayers) {
        
        if (Object.keys(game.players).length < game.maxplayers) {
          
          game.players[message.member.id] = {
            token: randomToken(),
            user: message.member
          };

          usersInGames[message.member.id] = game.id;
          
          message.reply("welcome! You're now part of the game.");
          
          console.log(game);
          
        } else {
          
          message.reply("sorry! This game is full.");
          
        }
        
      } else {
        
        message.reply("sorry! This game isn't accepting any new players.")
        
      }
      
    } else {
      
      message.reply("there isn't a game running in this channel.")
      
    }
    
  }
  
};

let printMembers = function (game) {
  
  let memberslist = "";
  
  for (let member in game.players) {
    
    memberslist += "* " + game.players[member].user.user.username + "\n";
    
  }
  
  return memberslist;
  
};

commandHandlers.startgame = function (message, args) {
  
  if (usersInGames[message.member.id]) {
    
    let game = runningGames[usersInGames[message.member.id]];
    
    if (game.players[message.member.id].owner) {

      message.member.sendMessage("http://localhost:3000/?user=" + message.member.id + "&token=" + game.players[message.member.id].token + "&gameid=" + game.id);

    } else {

      message.member.sendMessage("You must be the owner of a game to start it.");

    }
    
  } else {
    
    message.member.sendMessage("You aren't in that game.");
    
  }
  
};

commandHandlers.draw = function (message, args) {
  

  
};

let randomToken = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
};

submissionServer.submissionEvents.on("imageUploaded", function (data) {
  
  if (runningGames[data.game]) {
    
    let game = runningGames[data.game];
    
    if (game.players[data.user]) {
      
      console.log(data)
      
      game.channel.sendFile(data.image, null, game.players[data.user].user.user.username + " submitted this.");
      
    }
    
  }
  
});

//** Module Exports

module.exports = {
  "help": help,
  "commandHandlers": commandHandlers
};