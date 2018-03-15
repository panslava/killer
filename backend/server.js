var express = require('express');
var app = express();

express.use(express.static('../frontend/build'));
app.listen(5555);