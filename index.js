/* Uses the slack button feature to offer a real time bot to multiple teams */
var Botkit = require('botkit');

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT) {
  console.log('Error: Specify CLIENT_ID, CLIENT_SECRET and PORT in environment');
  process.exit(1);
}

var config = {}
if (process.env.MONGOLAB_URI) {
  var BotkitStorage = require('botkit-storage-mongo');
  config = {
    storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
  };
} else {
  config = {
    json_file_store: './db_slackbutton_slash_command/',
  };
}

var controller = Botkit.slackbot(config).configureSlackApp(
  {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scopes: ['commands'],
  }
);

controller.setupWebserver(process.env.PORT, function (err, webserver) {
  controller.createWebhookEndpoints(controller.webserver);

  controller.createOauthEndpoints(controller.webserver, function (err, req, res) {
    if (err) {
      res.status(500).send('ERROR: ' + err);
    } else {
      res.send('Success!');
    }
  });
});

controller.on('slash_command', function (bot, message) {
  switch (message.command) {
     case "/rlbot":
      // TODO create a function to take this command and verify it's valid, returning a data structure.
      var command = message.text.split(" ");
      var replyMessage;
      // TODO allow command length to be one, and just return a single emote.
      if (command.length == 2) {
        if (command[0] === "whatasave") {
          replyMessage = "What a save!";
        } else {
         bot.replyPrivate(message, "I'm sorry, I couldn't find the emote for your command");
         return;
        }
        for (var i = 0; i < command[1]; i++) {
          if (i == 3) {
            bot.replyPublicDelayed(message, "Chat disabled for 4 seconds.");
            return;
          }
          if (i == 0) {
            bot.replyPublic(message, replyMessage);
          } else {
            bot.replyPublicDelayed(message, replyMessage);
          }
        }
      } else {
        // if no text was supplied, treat it as a help command
        bot.replyPrivate(message,
          "I send emotes, just like you do in Rocket League. " +
          "Try typing `/rlbot whatasave 3`.");
        return;
      }

      break;
    default:
      bot.replyPublic(message, "I'm afraid I don't know how to " + message.command + " yet.");
  }
});
