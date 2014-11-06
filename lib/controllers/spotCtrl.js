(function(){
    "use-strict";
    var SpotService = require('../services/spotService');

    module.exports.post = function(req, res){
        SpotService.postSpot(req.body)
            .then(function(){
                res.status(200).send();
            }).catch(function(err){
                res.status(400).json(err);
            })
    };

    module.exports.get = function(req, res){
        console.log(req.query);
        SpotService.findSpots(req.query.prop, req.query.value)
            .then(function(markers){
                res.status(200).json(markers);
            }).catch(function(err){
                console.log(err);
                res.status(418).json(err);
            })
    };
})();
