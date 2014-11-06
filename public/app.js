(function(){
    "use strict";
    var app = angular.module("longboard", ['ui.router', 'google-maps'.ns()]);

    app.config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise("/home");


        $stateProvider
            .state('home', {
                url:'/home',
                templateUrl: 'views/homeView.html'
            })
            .state('home.map', {
                url: '/map',
                templateUrl: 'views/mapView.html',
                controller: 'mapCtrl'
            })
    });
})();