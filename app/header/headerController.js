app.controller("headerController", function ($scope, $rootScope, $localStorage, httpHeaderService, $location, $window) {

    $scope.goToMySpace = function () {
        try {
            if ($rootScope.jwt.token != null) {
                $location.path("/mySpaceMain");
            } else {
                $window.alert("veuillez vous connecter");
            }
        } catch (err) {
            $window.alert("veuillez vous connecter");
            console.log(err);
        }

    }

    $scope.init = function () {
        //utile car le token est gardé meme si la page est fermé
        $rootScope.jwt = $localStorage.jwt;
        //on met le token dans le header
        $rootScope.customHeader = httpHeaderService.getTokenHeader();
    }

    $scope.init();

});