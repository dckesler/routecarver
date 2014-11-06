(function(){
    "use strict";
    var app = angular.module("longboard");
    app.directive('bounce', function(){
        return{
            restrict: 'A',
            link: function (scope, elem, attrs){
                var checker = false;
                var up = function(){
                    checker = true;
                    elem.animate({boxShadow: "7px 12px 12px #333"}, {duration: 500, queue: false});
                    elem.animate({'margin-top': '3px'}, {duration: 500, queue: false}, down);
                };
                var down = function(){
                    checker = false;
                    elem.animate({'box-shadow': '10px 15px 10px #333'}, 500);
                    elem.animate({'margin-top': '0px'}, {duration: 500, queue: false}, up);
                };
                up();

            }

        }
    });
})();
