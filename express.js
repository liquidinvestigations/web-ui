var serverPort = 4200;

var express = require("express");
var app = express();

app.use('/nic/', express.static(__dirname + '/dist'));

app.listen(serverPort);
