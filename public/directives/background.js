(function(){
    'use strict';
    var app = angular.module('longboard');

    app.directive('theBackground', function(){
        return{
            restrict: 'A',
            link: function(scope, elem, attrs){
                var height = window.innerHeight;
                elem.css('height', height);
                var width = window.innerWidth;
                elem.css('width', width);

                window.onresize = function(){
                    height = window.innerHeight;
                    width = window.innerWidth;
                    elem.css('height', height);
                    elem.css('width', width);
                };
            }
        }
    });
})();
