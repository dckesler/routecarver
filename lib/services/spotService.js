(function(){
    "use-strict";
    var promise = require('bluebird'),
        Spot = require('../models/spot.js');

    promise.promisifyAll(Spot);
    promise.promisifyAll(Spot.prototype);

    module.exports.postSpot = function(spot){
        return new Spot(spot).saveAsync();
    };

    module.exports.findSpots = function(prop, value){
        var obj = {};
        obj[prop] = value;
        return Spot.findAsync(obj);
    };
})();