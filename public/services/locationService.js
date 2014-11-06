(function(){
    "use strict";
    var app = angular.module("longboard");

    app.service("locationService", function($http){
        this.getLocation = function(lat, long){
            return $http.get('http://localhost:8335/location?lat='+lat+'&long='+long);
        };

        var Spot = function(lat, long, address, city, county, state, difficulty, url){
            this.lat = lat;
            this.long = long;
            this.address = address;
            this.city = city;
            this.county = county;
            this.state = state;
            this.difficulty = difficulty;
            this.url = url;
        };
        this.saveSpot = function(lat, long, address, city, county, state, difficulty){
            var url;
            switch(difficulty){
                case "Easy":
                    url = "../images/Easy.png";
                    break;
                case "Intermediate":
                    url = "../images/Intermediate.png";
                    break;
                case "Advanced":
                    url = "../images/Advanced.png";
            }
            var aSpot = new Spot(lat, long, address, city, county, state, difficulty, url);
            return $http.post('http://localhost:8335/newSpot', aSpot);
        }
    });
})();
