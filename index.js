var express = require('express'),
    Mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    request = require('request');

var SpotController = require('./lib/controllers/spotCtrl');


Mongoose.connect('mongodb://localhost/routecarverrs');
app.listen(80);

app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));

app.get('/location', function(req, res){
    var lat = req.query.lat;
    var long = req.query.long;
    request.get('http://nominatim.openstreetmap.org/reverse?format=json&lat='+lat+'&lon='+long+'&zoom=18&addressdetails=1', function(error, response, body){
        if(!error){
            var parseBody = JSON.parse(body);
            res.status(200).json(parseBody);
        }
        else {
            res.status(418).json(error);
        }
    })
});

app.get('/weather', function(req, res){
    var lat = req.query.lat,
        long = req.query.long;
    request.get('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long, function(err, response, body){
        if(!err){
            var parsedBody = JSON.parse(body);
            res.status(200).json(parsedBody);
        }
        else{
            console.log(err);
        }
    })
});



app.post('/newSpot', SpotController.post);

app.get('/markers', SpotController.get);
