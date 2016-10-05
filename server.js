var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
app.get('/', function(req, res) {
    res.sendFile('home.html', {root: __dirname })
});
app.get('/index.js', function(req, res) {
    res.sendFile('index.js', {root: __dirname })
});
app.get('/testing.js', function(req, res) {
    res.sendFile('testing.js', {root: __dirname })
});
app.get('/geocodeAddresses.js', function(req, res) {
    res.sendFile('geocodeAddresses.js', {root: __dirname })
});
app.get('/calculateDistanceMatrices.js', function(req, res) {
    res.sendFile('calculateDistanceMatrices.js', {root: __dirname })
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
