# slack-rlbot

### Installation
After cloning the repo, run:

`npm install`

Then, if you're testing the app locally, run:
`npm install -g localtunnel`
`lt --port 8765 --subdomain rlbot`

### Usage
In another command prompt, run (replacing {clientid}, {clientsecret}, and {token} with the app's information):
`CLIENT_ID={clientid} CLIENT_SECRET={clientsecret} VERIFICATION_TOKEN={token} PORT=8765 npm start`

### Credits
Adapted from [this tutorial](https://medium.com/slack-developer-blog/easy-peasy-slash-commands-getting-started-c37ff3f14d3e#.oiil837ux).
