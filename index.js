var express = require('express');
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT));

require('./app/bot');

//START ===================================================
http.listen(app.get('port'), function(){

});
