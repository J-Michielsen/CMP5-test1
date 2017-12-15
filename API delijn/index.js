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

app.get('/indebuurt', function(req, res) {

     var inDeBuurt;

     var long = req.query.long;
     var lat = req.query.lat;
     var coorX = 0;
     var coorY = 0;
     var radius = 300;
     // omrekenen
     request('https://www.delijn.be/rise-api-core/coordinaten/convert/' + lat + '/' + long, function (error, response, body) {
          var response = JSON.parse(body);
          //console.log(response.xCoordinaat);
          coorX = response.xCoordinaat;
          coorY = response.yCoordinaat;

          console.log("x:"+coorX+"y:"+coorY);


          request('https://www.delijn.be/rise-api-core/haltes/indebuurt/' + coorX + '/' + coorY + '/' + radius, function (error, response, body) {
               // console.log('Status:', response.statusCode);
               // console.log('Headers:', JSON.stringify(response.headers));
               //console.log('Response:', body);
               inDeBuurt = body;

               //console.log(inDeBuurt);
               res.render('indebuurt', {
                    data: inDeBuurt
               });
          });
     });
});

app.get('/', function(req, res) {
    res.render('index', {
    });
});

app.get('/halte', function(req, res) {
     var halte;
     var halteNr = req.query.nr;
     console.log(halteNr);
     request('https://www.delijn.be/rise-api-core/haltes/vertrekken/' + halteNr + '/10', function (error, response, body) {
       // console.log('Status:', response.statusCode);
       // console.log('Headers:', JSON.stringify(response.headers));
       // console.log('Response:', body);
       halte = body;

       res.render('halte', {
           data: halte
      });
     });

});

app.use(express.static('public'))

app.listen(8080);
