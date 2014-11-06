(function(){
   "use strict";
    var app = angular.module('longboard');

    app.directive('stars', function(){
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var sepFactor = 6;

                var context = elem;
                var cWidth = $(document).width();
                var cHeight = $(document).height();
                var ccHeight = Math.pow(cHeight, (1/sepFactor));
                context.attr('height', cHeight);
                context.attr('width', cWidth);
                var canvas = context[0].getContext('2d');


                var colors = ['#FFF', '#F1F1FF', '#F1FFFF'];


                for (var i = 0; i < (cWidth*cHeight/1000); i++) {
                    var yy = Math.random()*ccHeight;
                    var y = Math.floor(Math.pow(yy, sepFactor));
                    if(y<2){
                        continue;
                    }
                    var x = Math.floor(Math.random() * cWidth);

                    var opacity = (((Math.random()*60)+40)/100);
                    var r = Math.floor(Math.random() * 3);
                    var color = colors[Math.floor(Math.random() * 3)];
                    canvas.beginPath();
                    canvas.globalAlpha = opacity;
                    canvas.arc(x, y, r, 0, Math.PI * 2);
                    canvas.fillStyle = color;
                    canvas.fill();
                    canvas.closePath()
                }

            }
        }
    });
})();