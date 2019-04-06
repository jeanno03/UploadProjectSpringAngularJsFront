app.controller("headerController", function ($scope, $rootScope, $localStorage, connectionTokenService) {

    $scope.init = function () {
        //utile car le token est gardé meme si la page est fermé
        $rootScope.jwt = $localStorage.jwt;
        //on met le token dans le header
        $rootScope.customHeader = connectionTokenService.getTokenHeader();
    }

    $scope.init();

});