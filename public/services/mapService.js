(function(){
    'use strict';
    var app = angular.module("longboard");

    app.service("mapService", function($http, $q, $state){
        var currentMarkers = [];
        this.giveMarkers = giveMarkers;
        this.getMarkers = getMarkers;
        this.NewMarker = NewMarker;

        function NewMarker(lat, long, i, address, difficulty, url){
            this.id = i;
            this.coords = {
                latitude: lat,
                longitude: long
            };
            this.address = address;
            this.difficulty = difficulty;
            this.url = url;
        }
        function giveMarkers() {
            return currentMarkers;
        }
        function getMarkers(prop, value){
            var deferred = $q.defer();
            $http.get('/markers?prop='+prop+'&value='+value)
                .then(function(data){
                    currentMarkers = [];
                    var markerData = data.data;
                    for(var i = 0; i < markerData.length; i++){
                        var aMarker = new NewMarker(markerData[i].lat, markerData[i].long, i, markerData[i].address, markerData[i].difficulty, markerData[i].url);
                        currentMarkers.push(aMarker);
                    }
                    deferred.resolve(data.data);
                    $state.go('home.map');
                });
            return deferred.promise;
        }
    });
})();
