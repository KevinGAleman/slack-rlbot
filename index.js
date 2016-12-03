var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT));

app.configure(function(){
  app.use(express.bodyParser());
  app.use(app.router);
});

app.listen(process.env.PORT);

require('./app/bot')(app);
