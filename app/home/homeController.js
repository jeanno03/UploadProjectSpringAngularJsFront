app.controller("HomeController", function($scope, $rootScope, $localStorage){
    $scope.init = function () {
        //utile car le token est gardé meme si la page est fermé
        $rootScope.jwt = $localStorage.jwt;
    }

    $scope.init();

});

