var app = angular.module("longboard");

app.service("weatherService", function($http, $q){
    this.getWeather = function(lat, long){
        var deferred = $q.defer();
        $http.get('http://localhost:8335/weather?lat='+lat.toFixed(0)+'&long='+long.toFixed(0))
            .then(function(data){
                deferred.resolve(data.data);
            });
        return deferred.promise;
    };
});