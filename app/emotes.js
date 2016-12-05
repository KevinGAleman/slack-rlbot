var exports = module.exports = {};
const util = require('util');

const emotes = {
    igotit: 'I got it!',
    taketheshot: 'Take the shot!',
    defending: 'Defending...',
    centering: 'Centering...',
    omg: 'OMG!',
    wow: 'Wow!',
    closeone: 'Close one!',
    no: 'Nooo!',
    shi: '$#@!',
    whoops: 'Whoops!',
    sorry: 'Sorry!',
    noproblem: 'No problem.',
    thanks: 'Thanks!',
    whatasave: 'What a save!',
    greatpass: 'Great pass!',
    niceshot: 'Nice shot!',
    allyours: 'All yours.',
    calculated: 'Calculated.',
    goforit: 'Go for it!',
    greatclear: 'Great Clear!',
    holycow: 'Holy cow!',
    inposition: 'In position.',
    incoming: 'Incoming!',
    mybad: 'My bad…',
    myfault: 'My fault.',
    needboost: 'Need Boost!',
    niceblock: 'Nice Block!',
    niceone: 'Nice one!',
    noway: 'No Way!',
    okay: 'Okay.',
    oops: 'Oops!',
    savage: 'Savage!',
    sick: 'Siiiick!',
    whataplay: 'What a play!',
    whew: 'Whew.',
    everybodydance: 'Everybody dance!',
    gg: 'gg',
    nicemoves: 'Nice moves.',
    onemoregame: 'One. More. Game.',
    rematch: 'Rematch!',
    thatwasfun: 'That was fun!',
    wellplayed: 'Well played.',
    whatagame: 'What a Game!'
};

function getCommand (command) {
  // Break out the command so we can parse it, and initialize the finalCommand to invalid.
    const commands = command.split(' ');
    const finalCommand = { type: 'invalid', text: '', times: 0 };

    // If the command is empty, or says help, then return a help command.
    if ((commands.length == 0) || (commands.length > 0 && (commands.indexOf('help') > -1))) {
        finalCommand.type = 'help';
        return finalCommand;
    // If the command has 1 or 2 parameters, then search for it. Otherwise, it's invalid.
    } else if (commands.length <= 2) {
        if (emotes.hasOwnProperty(commands[0])) {
            finalCommand.type = 'valid';
            finalCommand.text = emotes[commands[0]];

            // If there's two parameters and the second parameter is a number, that's how many times the user wants the phrase to repeat.
            if (commands.length == 2 && !isNaN(commands[1])) {
                finalCommand.times = commands[1];
            } else {
                finalCommand.times = 1;
            }
        }
    }

    return finalCommand;
};

exports.handleEmoteCommand = function (bot, message) {
  // Ignore the message if the Slack token isn't present.
  if (message.token !== process.env.VERIFICATION_TOKEN) return;

  // Get the message and repeat from the emotes module.
  const command = getCommand(message.text);
  if (command.type === 'valid') {
      bot.replyAcknowledge();
      for (var i = 0; i < command.times; i++) {
          // Slack format for usernames is <@{userId}:{userName}>
          const returnMsg = util.format('<@%s|%s>: %s', message.user, message.user_name, command.text);
          if (i == 0) {
              bot.replyPublicDelayed(message, returnMsg);
          } else if (i == 3) {
              bot.replyPrivateDelayed(message, 'Chat disabled for 4 seconds.');
              return;
          } else {
              bot.replyPublicDelayed(message, returnMsg);
          }
      }
  } else if (command.type === 'help'){
      bot.replyPrivate(message,
      'I send emotes, just like you do in Rocket League. ' +
      'Try typing `/rl whatasave 3`.');
  } else if (command.type === 'invalid') {
      bot.replyPrivate(message, 'I\'m sorry, I couldn\'t find the emote for your command');
  }
}
