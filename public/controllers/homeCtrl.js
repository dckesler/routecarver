(function(){
    "use strict";
    var app = angular.module('longboard');

    app.controller('homeCtrl', function($scope, $state, $timeout, locationService, weatherService, mapService){
        $scope.mapSpinner = false;
        $scope.spotSpinShow = false;
        $scope.spotFormShow = false;
        $scope.temp = "Sending out the";
        $scope.condition = "weather fairies";
        $scope.currentCity = "Consulting";
        $scope.currentState = "the spirits";
        $scope.clockTime = Date.now();

        $scope.timeSwitchStart = timeSwitchStart;
        $scope.getTime = getTime;
        $scope.clock = clock;
        $scope.timeSwitch = timeSwitch;
        $scope.homeLocation =  homeLocation;
        $scope.loadSpotForm = loadSpotForm;
        $scope.spotDifficulty = spotDifficulty;
        $scope.saveSpot = saveSpot;
        $scope.spotGo = spotGo;

        function timeSwitchStart(){
            $scope.getTime();
            window.setInterval($scope.getTime, 3600000)
        }
        function getTime(){
            var time = new Date().getHours();
            $scope.timeSwitch(time);
        }
        function clock(){
            $scope.clockTime = Date.now();
            $timeout($scope.clock, 10000);
        }
        function timeSwitch(time){
            switch(true){
                case time < 5 || time >= 20:
                    $scope.timeStyle = "../styles/night.css";
                    $scope.timeMessage = "Night boarding";
                    break;
                case time>5 && time<=10:
                    $scope.timeStyle = "../styles/morning.css";
                    $scope.timeMessage = "Good Morning";
                    break;
                case time>10 && time<=15:
                    $scope.timeStyle = "../styles/noonish.css";
                    $scope.timeMessage = "Lunch break boarding";
                    break;
                case time>15 && time<20:
                    $scope.timeStyle = "../styles/afternoon.css";
                    $scope.timeMessage = "Good Afternoon"
            }
        }

        function homeLocation() {
            var geo = navigator.geolocation;
            var success = function (position) {
                locationService.getLocation(position.coords.latitude, position.coords.longitude)
                    .then(function(data){
                        $scope.currentCity = data.data.address.city;
                        $scope.currentState = data.data.address.state;
                        $scope.currentCounty = data.data.address.county;
                        weatherService.getWeather(position.coords.latitude, position.coords.longitude)
                            .then(function(weather){
                                var toUpper = function(str) {
                                    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                                };

                                $scope.temp = (1.8*(weather.main.temp-273)+32).toFixed(1)+"\u00B0"+"F";
                                $scope.condition = toUpper(weather.weather['0'].description);
                                switch(weather.weather){
                                    case "rain":
                                        $scope.weatherMessage = "Rain's good for sliding, but bad for your board.";
                                        break;
                                    case "clear":
                                        $scope.weatherMessage = "Seems nice out...";

                                }
                            })
                    })
            };
            var error = function (err) {
                alert("Geolocation failed " + err);
            };
            var settings = {
                enableHighAccuracy: true,
                maximumAge: 99999999
            };
            geo.getCurrentPosition(success, error, settings);
        }
        function loadSpotForm(){
            var elem = $('#upDown');
            if($scope.spotFormShow){
                elem.animate({'box-shadow': '10px 15px 10px #333'}, 300);
                elem.animate({'margin-top': '0px'}, {duration: 300, queue: false});
                $scope.spotSpinShow = false;
                $scope.spotFormShow = false;
                $scope.spotDiff = null;
                var easy = document.getElementById('easy');
                var inter = document.getElementById('inter');
                var advanced = document.getElementById('advanced');
                easy.className = "difficultyButton";
                inter.className = "difficultyButton";
                advanced.className = "difficultyButton";
            }

            else {
                elem.animate({boxShadow: "1px 2px 2px #333"}, {duration: 300, queue: false});
                elem.animate({'margin-top': '6px'}, {duration: 300, queue: false});
                $scope.spotSpinShow = true;
                var geo = navigator.geolocation;
                var success = function (position) {
                    $scope.spotLat = position.coords.latitude;
                    $scope.prettyLat = position.coords.latitude.toFixed(2);
                    $scope.spotLong = position.coords.longitude;
                    $scope.prettyLong = position.coords.longitude.toFixed(2);
                    locationService.getLocation(position.coords.latitude, position.coords.longitude)
                        .then(function (data) {
                            if(!data.data.address.house_number){
                                $scope.spotAddress = data.data.address.road + " " + data.data.address.city + ", " + data.data.address.state;
                            }
                            else {
                                $scope.spotAddress = data.data.address.house_number + " " + data.data.address.road + " " + data.data.address.city + ", " + data.data.address.state;

                            }
                            $scope.spotCity = data.data.address.city;
                            $scope.spotCounty = data.data.address.county;
                            $scope.spotState = data.data.address.state;

                            $scope.spotSpinShow = false;
                            $scope.spotFormShow = true;
                        });
                };
                var err = function (err) {
                    alert("Geolocation failed" + err);
                };
                var settings = {
                    enableHighAccuracy: true,
                    maximumAge: 99999999
                };
                geo.getCurrentPosition(success, err, settings);
            }
        }
        function spotDifficulty(diff){
            switch(diff){
                case "Easy":
                    var easy = document.getElementById('easy');
                    var inter = document.getElementById('inter');
                    var advanced = document.getElementById('advanced');
                    easy.classList.add("selected");
                    inter.className = "difficultyButton";
                    advanced.className = "difficultyButton";
                    $scope.spotDiff = 'Easy';
                    break;
                case "Inter":
                    var easy = document.getElementById('easy');
                    var inter = document.getElementById('inter');
                    var advanced = document.getElementById('advanced');
                    inter.classList.add("selected");
                    easy.className = "difficultyButton";
                    advanced.className = "difficultyButton";
                    $scope.spotDiff = "Intermediate";
                    break;
                case "Advanced":
                    var easy = document.getElementById('easy');
                    var inter = document.getElementById('inter');
                    var advanced = document.getElementById('advanced');
                    advanced.classList.add("selected");
                    inter.className = "difficultyButton";
                    easy.className = "difficultyButton";
                    $scope.spotDiff = "Advanced";
            }
        }
        function saveSpot(){
            if(!$scope.spotDiff){
                alert('Please select a difficulty setting');
            }
            else{
                var confirm = confirm("You are about to register your current location as a trail for other longboarders to use." +
                " Are you sure this is what you want?");
                if(confirm){
                    $scope.spotFormShow = false;
                    $scope.spotSpinShow = true;
                    locationService.saveSpot($scope.spotLat, $scope.spotLong, $scope.spotAddress, $scope.spotCity, $scope.spotCounty, $scope.spotState, $scope.spotDiff).then(function(){
                        var elem = $('#upDown');
                        $scope.spotSpinShow = false;
                        $scope.spotDiff = null;
                        elem.animate({'box-shadow': '10px 15px 10px #333'}, 300);
                        elem.animate({'margin-top': '0px'}, {duration: 300, queue: false});
                        var easy = document.getElementById('easy');
                        var inter = document.getElementById('inter');
                        var advanced = document.getElementById('advanced');
                        easy.className = "difficultyButton";
                        inter.className = "difficultyButton";
                        advanced.className = "difficultyButton";
                        document.getElementById('htmler').innerHTML = '<p style="color:black;position:absolute;left:36%" id="saved">Saved...</p>';
                        window.scrollTo(0, 0);
                        $('#saved').fadeOut(3000);
                    }, function(err){
                        console.log(err);
                        var elem = $('#upDown');
                        $scope.spotSpinShow = false;
                        $scope.spotDiff = null;
                        elem.animate({'box-shadow': '10px 15px 10px #333'}, 300);
                        elem.animate({'margin-top': '0px'}, {duration: 300, queue: false});
                        var easy = document.getElementById('easy');
                        var inter = document.getElementById('inter');
                        var advanced = document.getElementById('advanced');
                        easy.className = "difficultyButton";
                        inter.className = "difficultyButton";
                        advanced.className = "difficultyButton";
                        document.getElementById('htmler').innerHTML = '<p style="color:black;position:absolute;left:36%" id="saved">This address already exists</p>';
                        window.scrollTo(0, 0);
                        $('#saved').fadeOut(5000);
                    });
                }
            }
        }
        function spotGo(prop, value){
            $state.go('home');
            $scope.mapSpinner = true;
            mapService.getMarkers(prop, value)
                .then(function(){
                    $scope.mapSpinner = false;
                })
        }


        $timeout($scope.clock, 30000);
        $scope.homeLocation();
        $scope.timeSwitchStart();
        $scope.aWord = "this time";
    });
})();