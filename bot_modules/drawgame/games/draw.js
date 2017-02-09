const common = require('./common.js');

let gameExports = {};

gameExports.rules = {
  maxplayers: 8
}

gameExports.startGame = function(game) {
  
//  console.log(game);
  
  for (let player in game.players) {
    
    let member = game.players[player].user;
    
    member.sendMessage("http://localhost:3000/?user=" + member.id + "&token=" + game.players[member.id].token + "&gameid=" + game.id);
    
    common.series([
      function (callback) {
        
        callback(null, 'one');
        
      },
      function (callback) {
        
        callback(null);
        
      }
    ],
    function (err, results) {
      
    });
    
  }
  
};

module.exports = gameExports;