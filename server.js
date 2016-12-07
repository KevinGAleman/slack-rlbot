var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', (process.env.PORT));

require('./app/bot')(app);

app.get("/", function(req, res) {
  res.redirect("https://github.com/KevinGAleman/slack-rlbot");
});

app.listen(process.env.PORT);
