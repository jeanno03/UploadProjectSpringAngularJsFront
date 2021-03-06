app.controller("ConnectionController", function ($scope, $rootScope, $location, $localStorage, httpUrlService, shareMySpaceServices, shareMyFileService) {

    $scope.credential = {};


    $scope.getConnect = function () {

        $scope.jwt = {};

        httpUrlService.getConnectJwt($scope.credential)
            .then(function (response) {
                console.log("success");
                data = response.data;

                $scope.jwt = data;
                console.log("$scope.jwt.token : " + $scope.jwt.token);

                $scope.tokenToLocalStorage($scope.jwt);
                $rootScope.jwt = $localStorage.jwt;

                $location.path("/mySpaceMain");

            }, function (error) {
                data = error.data;
                console.log("error : " + data.status);
                alert("error : " + data.status);
            });
    }

    $scope.tokenToLocalStorage = function (jwt) {
        $localStorage.jwt = jwt;
    }

    $scope.toDisconnect = function () {
        $localStorage.jwt = {};
        $rootScope.jwt = null;

        $rootScope.customHeader={};

        shareMySpaceServices.destroyCurrentRootMySpace();
        shareMyFileService.destroyCurrentRootMySpace();

        $rootScope.currentRootMySpaces={};
        $rootScope.currentRootMySpace={};

        alert("Vous avez été déconnecté!");
        $location.path("/home");
    }

    $scope.init = function () {
        //utile car le token est gardé meme si la page est fermé
        $rootScope.jwt = $localStorage.jwt;
    }

    $scope.init();

});
