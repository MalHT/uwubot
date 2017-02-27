let functions = {};

//** Submissions webserver

const EventEmitter = require('events');

const http = require('http');
const port = 3000;

const url = require('url');
const fs = require('fs');
const qs = require('querystring');
let pdu = require('parse-data-uri');

let globalGames = require("./globalGames.js");

const requestHandler = (request, response) => {  
  
  let requestUrl = url.parse(request.url);
  
  if (requestUrl.pathname === "/") {
    
    var queryData = url.parse(request.url, true).query;
    
    response.writeHead(200, {'Content-Type': 'text/html'});
    
    
    console.log(globalGames.usersInGames);
    
    if (queryData.user && queryData.gameid) {
    
    getFile("./bot_modules/drawgame/htdocs/drawing.html", function (data) {
      
      response.end(data);
      
    });
      
    } else {
      
      getFile("./bot_modules/drawgame/htdocs/nogame.html", function (data) {

        response.end(data);

      });
      
    }
    
  } else if (requestUrl.pathname === "/submit") {
    
    response.writeHead(200, {'Content-Type': 'application/json'});
    
    if (request.method == 'POST') {
      
        var body = '';
        request.on('data', function (data) {
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) { 
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }
        });
        request.on('end', function () {

          var POST = qs.parse(body);
          
          try {
            
//            if {game.}
            
            let image = parseImage(POST.canvasData.replace(/ /g, "+"));

            functions.submissionEvents.emit("imageUploaded", {
              image: image,
              user: POST.user,
              game: POST.game,
              token: POST.token
            });
            
            response.end("{'success': true}");
            
          } catch (e) {
          
            console.log(e);
            response.end("{}");
            
          }

        });
      
    } else {
      
      response.end("{}");
      
    }
    
  } else if (requestUrl.pathname === "/style.css") {
    
    response.writeHead(200, {'Content-Type': 'text/css'});
    
    getFile("./bot_modules/drawgame/htdocs/style.css", function (data) {
      
      response.end(data);
      
    });
    
  } else if (requestUrl.pathname === "/simple-drawing-board.min.js") {
    
    response.writeHead(200, {'Content-Type': 'application/javascript'});
    
    getFile("./node_modules/simple-drawing-board/dist/simple-drawing-board.min.js", function (data) {
      
      response.end(data);
      
    });
    
  } else {
    
    response.end("404");
    
  }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {  
  if (err) {
    return console.log('Error setting up games submission server.', err);
  }

  console.log(`Games submission server is listening on ${port}`);
});

let parseImage = function (dataUri) {
  
  var parsedUri = pdu(dataUri);
  
  if (parsedUri && parsedUri.mimeType === 'image/png') {
    
    return parsedUri.data;
    
  } else {
    
    return false;
    
  }
  
}

let getFile = function (path, callback) {
  
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      
      console.log(err);
      
      callback(false);
      
    } 
    
    callback(data);
    
  });
  
};

functions.submissionEvents = new EventEmitter();

module.exports = functions;