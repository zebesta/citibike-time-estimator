var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
app.get('/', function(req, res) {
    res.sendFile('home.html', {root: __dirname })
});
app.get('/index.js', function(req, res) {
    res.sendFile('index.js', {root: __dirname })
});
app.get('/index_node.js', function(req, res) {
    res.sendFile('index_node.js', {root: __dirname })
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
app.get('/helloworld', function(req,res) {
  var hello = {
    hi: 'Hello World'
  }
  res.json(hello);
});
// app.get('/address/:add', function(req,res) {
//   console.log("Trying to get address for: " + req.params.add);
//   res.json()
//
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
