# slack-rlbot
RL Bot is a Slack bot designed to utilize the emotes found in the popular vehicular soccer game by Psyonix, Rocket League. If you know anything about Rocket League, you'll know just how much depth of conversation you can have with just a few emotes; this app is designed to bring that depth to your Slack channels.

## Usage
First you'll need to authorize the app for your team by hitting https://rlbot.co/login.

Next, you can start ~~spamming~~ sending emotes to your team. Command structure current has two possible use cases:

`/rl whatasave` - Sends "What a save!" with an indicator of who sent it.

`/rl whatasave {number}` - Sends "What a save!" a number of times before telling you (ineffectively, for now) that your chat has been disabled for 4 seconds.

## Emotes
RL Bot currently supports the same set of emotes that the game does. Here's how you access them:

| Command        | Emote            |
| -------------- |:----------------:|
| igotit         | I got it!        |
| taketheshot    | Take the shot!   |
| defending      | Defending...     |
| centering      | Centering...     |
| omg            | OMG!             |
| wow            | Wow!             |
| closeone       | Close one!       |
| no             | Nooo!            |
| shi            | $#@!             |
| whoops         | Whoops!          |
| sorry          | Sorry!           |
| noproblem      | No problem.      |
| thanks         | Thanks!          |
| whatasave      | What a save!     |
| greatpass      | Great pass!      |
| niceshot       | Nice shot!       |
| allyours       | All yours        |
| calculated     | Calculated.      |
| goforit        | Go for it!       |
| greatclear     | Great clear!     |
| holycow        | Holy cow!        |
| inposition     | In position.     |
| incoming       | Incoming!        |
| mybad          | My bad...        |
| myfault        | My fault.        |
| needboost      | Need Boost!      |
| niceblock      | Nice Block!      |
| niceone        | Nice one!        |
| noway          | No way!          |
| okay           | Okay.            |
| oops           | Oops!            |
| savage         | Savage!          |
| sick           | Siiiick!         |
| whataplay      | What a play!     |
| whew           | Whew.            |
| everybodydance | Everybody dance! |
| gg             | gg               |
| nicemoves      | Nice moves,      |
| onemoregame    | One. More. Ganme.|
| rematch        | Rematch!         |
| thatwasfun     | That was fun!    |
| wellplayed     | Well played.     |
| whatagame      | What a Game!     |

## Developers

### Installation
After cloning the repo, just run `npm install` from the app's root directory.

### Build/Run
If you want to make changes and test them in Slack, you'll need to [make an app in Slack](https://api.slack.com/apps?new_app=1) and get some credentials. Once you do this, you can open a command prompt and run (replacing {clientid}, {clientsecret}, and {token} with the app's information):
`CLIENT_ID={clientid} CLIENT_SECRET={clientsecret} VERIFICATION_TOKEN={token} PORT=8080 npm start`

### Deploying/Testing
Then, if you plan on testing the app that you're running locally, you'll need to open your IP to the public using a service like [localtunnel](https://localtunnel.github.io/www/). To do this, run:

`npm install -g localtunnel`

Now, in a separate terminal window from the one that ran `npm start`, you can run:

`lt --port {choose_port} --subdomain {your_subdomain}`

Point your Slack app's OAuth and slash command endpoints to `{your_subdomain}.localtunnel.me`, and you can now test the app's functionality by going to `{your_subdomain}.localtunnel.me/login`, authorize the app for your Slack team, and start running slash commands. Happy spammimng!

### Credits
Rocket League is a fantastic video game from the wonderful creators at [Psyonix](http://psyonix.com/).

A lot of the code in this project started from following [this excellent tutorial](https://medium.com/slack-developer-blog/easy-peasy-slash-commands-getting-started-c37ff3f14d3e#.oiil837ux).
