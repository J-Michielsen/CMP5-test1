// server.js
// load the things we need
var express = require('express');
var request = require('request');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to ejs
app.set('view engine', 'ejs');

var inDeBuurt;
request('https://www.delijn.be/rise-api-core/haltes/indebuurt/103787/194286/300', function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  inDeBuurt = body;
      console.log(inDeBuurt);
});


app.get('/', function(req, res) {
    res.render('index', {
      data: inDeBuurt
    });
});

app.get('/', function(req, res) {
    res.render('halte', {
      data: d
    });
});





app.listen(8080);
