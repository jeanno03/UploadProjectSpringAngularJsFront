app.controller("MySpaceController", function ($scope, $http, $location, UserService, $localStorage) {
    $scope.jwt = {};
    $scope.jwt = $localStorage.jwt;
    $scope.mySpaceMyUser = {};
    $scope.mySpaceName = null;
    $scope.customHeader = {};
    //au lancement de la page va envoyer le token en header pour récupérer myUserDto
    $scope.init = function () {
        $scope.getMyUserMySpaceJwt();

    }

    $scope.getMyUserMySpaceJwt = function () {
        $scope.customHeader = $scope.getCustomHeader();
        $http.get("http://localhost:8080/MyUser/getMyUserMySpaceJwt", $scope.customHeader).then(function (response) {
            console.log("success");
            data = response.data;
            $scope.mySpaceMyUser = data;
            console.log("$scope.mySpaceMyUser.login : " + $scope.mySpaceMyUser.login);
        }, function (error) {
            data = error.data;
            console.log("error : " + data.status);
            alert("error : " + data.status);
        })
    }

    $scope.getCustomHeader = function () {
        var customHeader = {
            headers: $scope.jwt
        };
        return customHeader;
    }


    $scope.getFiles = function (index) {
        $scope.myFilesSelected = {};
        $scope.myFilesSelected = $scope.mySpaceMyUser.mySpacesDto[index].myFilesDto;
    }

    $scope.createMySpace = function () {
        $scope.customHeader = $scope.getCustomHeader();
        $http.post("http://localhost:8080/MySpace/createMySpace", $scope.mySpaceName, $scope.customHeader)
            .then(function (response) {
                data = response.data;
                $scope.mySpaceMyUser = data;

                $location.path("/myspace");
                $scope.init();
            }, function (error) {
                console.log("error : " + data.error)
            })
    };

    $scope.init();

});