(function(){
   "use strict";
    var app = angular.module('longboard');

    app.controller('mapCtrl', function($scope, mapService) {

        $scope.centerMap = centerMap;
        $scope.getMarkers = getMarkers;
        $scope.sniff = function(address, diff){
            $scope.currentAddress = address;
            $scope.currentDiff = diff;
        };

        function centerMap(){
            var geo = navigator.geolocation;
            var success = function(position){
                $scope.map = {
                    center: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    zoom: 8
                };
                console.log($scope.map);
            };
            var error = function(err){
                alert("Geolocation failed "+err);
            };
            var settings = {
                enableHighAccuracy: true,
                maximumAge: 9999999
            };

            geo.getCurrentPosition(success, error, settings);

        }
        function getMarkers(){
            $scope.markers = mapService.giveMarkers();
            console.log($scope.markers);

        }

        $scope.map = {
            center: {
                latitude: 50,
                longitude: -80
            },
            zoom: 8
        };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: 40.1451,
                longitude: -99.6680
            }
        };
        $scope.mapOptions = {
            scrollWheel: false
        };



        $scope.showWeather = true;
        $scope.showTraffic = true;
        $scope.weatherOptions = {
            temperatureUnits: 'TemperatureUnit.FAHRENHEIT'
        };
        $scope.centerMap();
        $scope.getMarkers();

    });
})();