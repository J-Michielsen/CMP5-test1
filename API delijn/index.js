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
});

var halte;
request('https://www.delijn.be/rise-api-core/haltes/titel/200144', function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  halte = body;
});

app.get('/indebuurt', function(req, res) {
    res.render('indebuurt', {
      data: inDeBuurt
    });
});

app.get('/', function(req, res) {
    res.render('index', {
    });
});

app.get('/halte/:number', function(req, res) {
    res.render('halte', {
         data: halte
    });
});





app.listen(8080);
