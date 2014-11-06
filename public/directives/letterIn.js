(function(){
    "use strict";
    var app = angular.module("longboard");

    app.directive('letterIn', function(){
        return{
            restrict: 'A',
            scope: {
                word: '@word',
                wait: '@wait',
                speed: '@speed',
                fade: '@fade'
            },
            link: function (scope, elem, attrs){

                var lettersIn = function(str, j){
                    if(j>str.length){
                        if(scope.fade!=='never') {
                            if (scope.fade) {
                                var something = parseInt(scope.fade);
                                elem.fadeOut(something);
                            }
                            else {
                                elem.fadeOut(1000);
                            }
                            return;
                        }
                        else{
                            return;
                        }
                    }
                    else if(!j) {
                        j = 0;
                    }
                    elem.append(str[j]);
                    setTimeout(function(){
                        lettersIn(str, j+1)
                    }, scope.speed||200);
                };

                setTimeout(function(){
                    lettersIn(scope.word);
                }, scope.wait||0)
            }

        }
    });
})();