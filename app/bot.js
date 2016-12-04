module.exports = function(app) {
  const Botkit = require('botkit');
  const commands = require('./commands.js');
  const util = require('util');

  if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN) {
      /* eslint no-console: 0 */
      console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN, and PORT in environment');
      process.exit(1);
  }

  var config = {};
  if (process.env.MONGOLAB_URI) {
      var BotkitStorage = require('botkit-storage-mongo');
      config = {
          stats_optout: true,
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

  controller.createWebhookEndpoints(app);

  controller.createOauthEndpoints(app, function (err, req, res) {
      if (err) {
          res.status(500).send('ERROR: ' + err);
      } else {
          res.send('Success!');
      }
  });

  controller.on('slash_command', function (bot, message) {
      switch (message.command) {
      case '/rl': {
        // Ignore the message if the Slack token isn't present.
          if (message.token !== process.env.VERIFICATION_TOKEN) return;

        // Get the message and repeat from the commands module.
          const command = commands.getCommand(message.text);
          if (command.type === 'valid') {
              bot.replyAcknowledge();
              for (var i = 0; i < command.times; i++) {
                  // Slack format for usernames is <@{userId}:{userName}>
                  const finalText = util.format('<@%s|%s>: %s', message.user, message.user_name, command.text);
                  if (i == 0) {
                      bot.replyPublicDelayed(message, finalText);
                  } else if (i == 3) {
                      bot.replyPrivateDelayed(message, 'Chat disabled for 4 seconds.');
                      return;
                  } else {
                      bot.replyPublicDelayed(message, finalText);
                  }
              }
          } else if (command.type === 'help'){
              bot.replyPrivate(message,
            'I send emotes, just like you do in Rocket League. ' +
            'Try typing `/rl whatasave 3`.');
          } else if (command.type === 'invalid') {
              bot.replyPrivate(message, 'I\'m sorry, I couldn\'t find the emote for your command');
          }

          break;
      }
      default:
          bot.replyPrivate(message, 'I\'m afraid I don\'t know how to ' + message.command + ' yet.');
      }
  });
}
