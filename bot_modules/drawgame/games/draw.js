const common = require('./common.js');

let gameExports = {};

gameExports.rules = {
  maxplayers: 8
}

gameExports.actions = {};

gameExports.startGame = function(game) {
  
  // Set up game object entries that are unique to this game.
  game.acceptingDrawingSubmissions = false;
  
  // Run this game script
  runGameScript(game, [
    {
      func: gameExports.actions.pmAllPlayersText,
      args: {"message": "Hello!"}
    },
    {
      func: gameExports.actions.wait,
      args: {"time": 3000}
    },
    {
      func: gameExports.actions.pmAllPlayersText,
      args: {"message": "Hello again!"}
    },
    {
      func: gameExports.actions.getDrawings,
      args: {"time": 30000}
    },
  ]);
  
};


let runGameScript = function (game, gameScript) {
  
  let functionsArray = [];
  
  gameScript.forEach (function (element) {
    
    functionsArray.push(function (callback) {
      
      element.func(game, element.args, callback);
      
    });
    
  });
  
  common.waterfall(functionsArray, function after (err, results) {});
  
}

gameExports.actions.pmAllPlayersText = function (game, args, callback) {
  
  let message = args.message;
  
  for (let player in game.players) {
    
    let member = game.players[player].user;
    
    member.sendMessage(message);
    
  }
  
  callback();
  
};

gameExports.actions.wait = function (game, args, callback) {
  
  let time = args.time;
  
  setTimeout(function () {
    
    callback(null);
    
  }, time);
  
}

gameExports.actions.pmPlayer = function (game, args, callback) {
  
  let player = args.player;
  let message = args.message;
  

};

gameExports.actions.getDrawings = function (game, args, callback) {
  
  let time = args.time;
  
  for (let player in game.players) {
    
    let member = game.players[player].user;
    
    member.sendMessage(getDrawingLink(game, member, time));
    
  }
  
  game
  
  callback();
  
};

let getDrawingLink = function (game, member, time) {
  
  let startTime = Date.now();
  let endTime;
  
  if (time && typeof time === "number") {
    
    endTime = startTime + time;
    
  }
  
  let inviteLink = "http://localhost:3000/?user=" + member.id + "&token=" + game.players[member.id].token + "&gameid=" + game.id + "&starttime=" + startTime;
  
  if (endTime) {
    
    inviteLink += "&endtime=" + endTime;
    
  }
  
  return inviteLink;
  
}

module.exports = gameExports;