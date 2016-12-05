const util = require('util');
const emotes = require('./emotes');

module.exports = function(app) {
    const Botkit = require('botkit');

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

    var controller = Botkit.slackbot(config).configureSlackApp({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        scopes: ['commands'],
    });

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
            emotes.handleEmoteCommand(bot, message);
            break;
        }
        case '/rltest': {
            emotes.handleEmoteCommand(bot, message);
            break;
        }
        default:
            bot.replyPrivate(message, util.format('I\'m afraid I don\'t know how to %s.', message.command));
        }
    });
};
