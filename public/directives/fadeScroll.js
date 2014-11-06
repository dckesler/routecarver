(function(){
    var app = angular.module("longboard");

    app.directive('fadeScroll', function(){
        return{
            restrict: 'AE',
            scope: {
                fade: '@fade',
                start: '@start'
            },
            link: function (scope, elem, attrs){
                var theFade = function(){
                    var startSpot = scope.start || 0;
                    var fadeFactor = scope.fade || 1;
                    var relativePoint = ($(window).scrollTop() - startSpot);
                    if( relativePoint >= 0){
                        var factor = (( relativePoint/1000 ) * fadeFactor);
                        elem.css('opacity', (1-factor));
                    }
                };
                $(window).scroll(theFade);
            }

        }
    });
})();