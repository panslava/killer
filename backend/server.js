var express = require('express');
var app = express();

app.use(express.static('../frontend/build'));
app.listen(80);