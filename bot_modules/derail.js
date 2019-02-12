/**
 * DERAIL - In case of excessively intense conversation, posts a random Neil Cicierega song
 */

let botConfig = require("../config.json");
let serverConfig = require("../server_config.js");

let help = "**Derail**\n";
help += "In case of excessively intense conversation, posts a random Neil Cicierega song.\n";
help += "*!derail*.\n";

//** Command handlers
let commandHandlers = {};

commandHandlers.derail = function (message, args) {

var songs = ["https://www.youtube.com/watch?v=klQTj76Qo9k?", "https://www.youtube.com/watch?v=Unutr2aalRo", "https://www.youtube.com/watch?v=ZAYV3d9fSW8", "https://www.youtube.com/watch?v=G_GQQlehGxE", "https://www.youtube.com/watch?v=kBCyaXJj0VI", "https://www.youtube.com/watch?v=f_3ZoMt0VfQ", "https://www.youtube.com/watch?v=dQ7TmmyZnHI", "https://www.youtube.com/watch?v=T-UAC_aPpkU", "https://www.youtube.com/watch?v=Dy_0afpqsgM", "https://www.youtube.com/watch?v=wEmJH7JsKgM", "https://www.youtube.com/watch?v=SRdSoZO-5mM", "https://www.youtube.com/watch?v=LqJTk-6HBD4", "https://www.youtube.com/watch?v=nEmyonfpsgI", "https://www.youtube.com/watch?v=XPlJIYE1lS0", "https://www.youtube.com/watch?v=SCudITYjIPs", "https://www.youtube.com/watch?v=3ZT05Md0Fxg", "https://www.youtube.com/watch?v=XTte01kdG_k", "https://www.youtube.com/watch?v=qn7TcsT91C8", "https://www.youtube.com/watch?v=kR0gOEyK6Tg", "https://www.youtube.com/watch?v=98XP-exh9QI", "https://www.youtube.com/watch?v=Xx5IUyg9whQ", "https://www.youtube.com/watch?v=KSae82WZCA8", "https://www.youtube.com/watch?v=UwHlEBlWT-4", "https://www.youtube.com/watch?v=1t-j3q1pvAw", "https://www.youtube.com/watch?v=oC083te8VP4", "https://www.youtube.com/watch?v=tzKDmS0zAPo", "https://www.youtube.com/watch?v=eDjV0KlXfOY", "https://www.youtube.com/watch?v=NEYc8ar2Bpw", "https://www.youtube.com/watch?v=mk6lDkTO0Nw","https://www.youtube.com/watch?v=Jpj0v0U4R0o", "https://www.youtube.com/watch?v=yVcAyEMM4Cc", "https://www.youtube.com/watch?v=VqiHiMuEkes", "https://www.youtube.com/watch?v=mSHUIEDBbl4", "https://www.youtube.com/watch?v=HVVVcuP94RY", "https://www.youtube.com/watch?v=hv7fmn55iks", "https://www.youtube.com/watch?v=RBmoQSHfO2U", "https://www.youtube.com/watch?v=NxXufI6-OIE", "https://www.youtube.com/watch?v=eXlmeJWUNvw", "https://www.youtube.com/watch?v=LoaA8Jz5s2U", "https://www.youtube.com/watch?v=RFyCPicGbXM", "https://www.youtube.com/watch?v=3cXjcKTRWcg", "https://www.youtube.com/watch?v=_MuuMgWSQEY", "https://www.youtube.com/watch?v=DsoCe7C4Kmk", "https://www.youtube.com/watch?v=8D-WVlRohQk", "https://www.youtube.com/watch?v=wGa1b0m-LWY", "https://www.youtube.com/watch?v=mw2fh8qfDiA", "https://www.youtube.com/watch?v=CPhXKak_bHw", "https://www.youtube.com/watch?v=LNJH0KCGLeQ", "https://www.youtube.com/watch?v=JIGUHqV-aH8", "https://www.youtube.com/watch?v=KqjxnAreV2o", "https://www.youtube.com/watch?v=z3lElikZD2Y", "https://www.youtube.com/watch?v=HsLmgIjOrP4", "https://www.youtube.com/watch?v=FDiehvo39g8", "https://www.youtube.com/watch?v=uaEYBwb1U7U", "https://www.youtube.com/watch?v=ygI-2F8ApUM"]
var choose = songs[Math.floor(Math.random() * songs.length)];
message.channel.sendMessage(choose);

};

//** Module Exports
module.exports = {
	"help": help,
	"commandHandlers": commandHandlers
};

let scriptName = __filename.split(/[\\/]/).pop().split(".").shift();
console.info(`${scriptName} module loaded.`);