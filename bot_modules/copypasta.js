/**
 * ANIMALS - Gets important pictures of important animals
 */

let config = require("../config.json");

let help = "**Copypastas**\n";
help += "Sends only the best and most rational copypastas.\n";
help += "*!fiveminutes*, *!womenbleed*, *!mythreegirlfriends*, *!brevity*, *!anything*, *!navyseals*, *!beemovie*.\n";

//** Command handlers

let commandHandlers = {};

commandHandlers.fiveminutes = function (message, args) {

      
      message.channel.send("Oh fucking hell, can you not summarize this in under 5 minutes? I don't have the patience to sit through over half an hour of this and, to be honest, here is the video you should be responding to on the issue anyway as I have already acknowledged I did not dig deeply enough into the subject - it's worse than I thought: https://www.youtube.com/watch?v=rc24YtUslCU");
      
  
};

commandHandlers.womenbleed = function (message, args) {
  
      message.channel.send("Feminists have never – and will never – accomplish anything of worth, because they reject the masculine principle; the women of the greatest accomplishments are those who’ve submitted to it. Women bleed on the birthing bed, while men bleed on the battlefield; that is the nature of the species *Man*. His world of gender-fluidity sells itself as freedom, but it is anything but.");
      
};

commandHandlers.mythreegirlfriends = function (message, args) {

      message.channel.send("Come again? *The bar falls silent. No one dares to make a sound, as you have just said a very poor choice of words at a very dangerous time. I remain slumped over the bar, not looking back to you. One hand limply holding an almost empty bottle, the other hand cradling my head. I repeat the question, this time louder.* Come again?! *You can hear me slur the words, the sentence sounds like a real struggle for me to get out. I’m clearly intoxicated. A bead of sweat rolls down your face as you realize you might have just fucked up in a very major way. Everyone else in the bar is pretending to not notice what is going on. The bartender idly washes a mug with a cloth. His eyes are closed and he’s muttering something to himself. A handful of people hurriedly leave. One person looks back at you, a look of sorrow on their face. They almost say something, but shake their head and cast their eyes down to the floor, and leave. But not you. You stand, petrified. A quick look at me reveals I’m still  at the bar. You look to the exit, there’s still time. But there’s not, there’s not, there’s not. Your fate was sealed the moment you opened your mouth.* Mother fuck.. what did you say?! *I slowly rise from my stool and being to lumber over to you.  I look a mess. My hair is unkempt, I haven’t shaved in what looks like months, there are dark heavy bags under my eyes, my shirt is stained and has holes in it, and I’m missing a shoe. But the main thing you notice is the gun tucked into my jeans, and my massive muscle arms that look like they were made for punching. You know that song about the boots that were made for walking? Yeah, it’s like that only instead of boots it’s my muscles and instead of walking it’s punching. As I drunkenly sway over to you, you think of your family… Will they mourn you, or will they try and forget this blotch of stupidity, that their child insulted the Jory publicly, ever happened to their family? Your thoughts are cut short as I now stand face to face with you. I grab your face and pull you even closer.* Playin?! There was nothing playing… no playing you fuck. No playing… it was real.. the realest thing I’ve ever know.. felt… Love. I loved them… Blaiz…. Chas-Chas… Funk… I loved all three of em… but they…*My face is wet with tears and I’m blinking constantly in vain to hold them back.* They left me… left… *Almost instantly the sadness leaves my face and is replaced with pure anger.* Playin? Playin?! *My hand leaves your face and starts to head to what you think is the gun. You close your eyes and see God looking at you, shrugging. ‘Pft, you brought this upon yourself dude.’ He says as he waves his hands at you dismissively. But instead of the gun, my hands grab yours. Your eyes jolt open and the anger is gone from my face. There is only sadness.* Left me… * I fall to the floor and sob.* Wow, grow up. *You say before you leave the bar but are hit almost immediately from a car and are killed upon impact.*");
  
};

commandHandlers.brevity = function (message, args) {
   
      message.channel.send("'Brevity is the soul of IDIOTS. Talk FOR EVER about things you don't like. NEVER stop talking about them. THAT'LL prove you right! I'm rational. I'M RATIONAL! Sexual harassment isn't a big deal. It's not a big deal! IT'S NOT A BIG DEAL! AAAAAAAAAA-' –Willy Shak's Pear");

};

commandHandlers.anything = function (message, args) {

      message.channel.send("Literally anything can become a forced copypasta. Watch this.");

};

commandHandlers.navyseals = function (message, args) {
  
      message.channel.send("What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USAand your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo");
  
};

commandHandlers.beemovie = function (message, args) {
      
      message.channel.send("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? - Barry? - Adam? - Can you believe this is happening? - I can't. I'll pick you up.");

};

//** Module Exports

module.exports = {
  "help": help,
  "commandHandlers": commandHandlers
};