var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

app.use(express.static('../frontend/build'));
http.createServer(app).listen(80);
https.createServer(options, app).listen(443);