var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT));

require('./app/bot')(app);

//START ===================================================
app.listen(process.env.PORT);
