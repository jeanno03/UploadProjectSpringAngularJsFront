app.controller("SearchController", function($scope, $rootScope, $http,$location,$localStorage){

    $scope.init = function () {
        //utile car le token est gardé meme si la page est fermé
        $rootScope.jwt = $localStorage.jwt;
    }

    $scope.init();
});