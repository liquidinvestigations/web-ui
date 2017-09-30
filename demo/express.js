var mockUrl = 'http://private-8cad8-liquidinvestigations.apiary-mock.com';

var serverPort = 80;

var express = require("express");
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/', express.static(__dirname + '/dist'));

var apiProxy = proxy('/api', {
    target: mockUrl,
    changeOrigin: true
});

app.use('/api', apiProxy);
app.listen(serverPort);