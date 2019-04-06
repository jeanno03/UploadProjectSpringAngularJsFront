app.controller("ConnectionController", function ($scope, $rootScope, $location, $localStorage, connectionHttpService) {

    $scope.credential = {};


    $scope.getConnect = function () {

        $scope.jwt = {};

        connectionHttpService.getConnectJwt($scope.credential)
            .then(function (response) {
                console.log("success");
                data = response.data;

                $scope.jwt = data;
                console.log("$scope.jwt.token : " + $scope.jwt.token);

                $scope.tokenToLocalStorage($scope.jwt);

                // $rootScope.jwt = null;
                $rootScope.jwt = $localStorage.jwt;

                $location.path("/mySpaceMain");

            }, function (error) {
                data = error.data;
                console.log("error : " + data.return);
                alert("error : " + data.return);
            });
    }

    $scope.tokenToLocalStorage = function (jwt) {
        $localStorage.jwt = jwt;
    }

    $scope.toDisconnect = function () {
        $localStorage.jwt = {};
        $rootScope.jwt = null;

        alert("Vous avez été déconnecté!");
        $location.path("/home");
    }

    $scope.init = function () {
        //utile car le token est gardé meme si la page est fermé
        $rootScope.jwt = $localStorage.jwt;
    }

    $scope.init();

});
