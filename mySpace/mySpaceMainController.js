app.controller("mySpaceMainController", function ($scope, $rootScope, $http, $location, shareMySpaceServices, $localStorage) {
    $scope.jwt = {};
    $scope.jwt = $localStorage.jwt;

    $scope.mySpaces = {};
    $rootScope.currentRootMySpaces = {};


    $scope.customHeader = {};

    // lié à getMyUserMySpaceJwt ==> non utilisé
    $scope.mySpaceMyUser = {};


    //au lancement de la page va envoyer le token en header pour récupérer myUserDto
    $scope.init = function () {
        // $scope.getMyUserMySpaceJwt();
        $scope.getAllMySpaceJwt();
         

    }

    //fonction plus utiliser ca trop consommateur de ressource en sql voir back
    $scope.getMyUserMySpaceJwt = function () {
        $scope.customHeader = $scope.getCustomHeader();
        $http.get("http://localhost:8080/MyUser/getMyUserMySpaceJwt", $scope.customHeader).then(function (response) {
            console.log("success");
            data = response.data;
            $scope.mySpaceMyUser = data;
            console.log("$scope.mySpaceMyUser.login : " + $scope.mySpaceMyUser.login);
        }, function (error) {
            data = error.data;
            console.log("status : " + data.status);
            alert("status : " + data.status);
        })
    }

    //function lié à getMyUserMySpaceJwt ==> non utilisé
    $scope.getFiles = function (index) {
        $scope.myFilesSelected = {};
        $scope.myFilesSelected = $scope.mySpaceMyUser.mySpacesDto[index].myFilesDto;
    }

    //remplacant de getMyUserMySpaceJwt (requete native en back)
    $scope.getAllMySpaceJwt = function () {
        $scope.customHeader = $scope.getCustomHeader();
        $http.get("http://localhost:8080/MySpace/getAllMySpaceJwt", $scope.customHeader).then(function (response) {
            data = response.data;
            $scope.mySpaces = data;
            //je partage $scope.mySpaces
            $scope.setMySpaceToCurrentRootMySpaces($scope.mySpaces);
            $scope.getMySpaceToCurrentRootMySpaces(); 
            //pour rafraichir et lancer le init() de ConnectionController
            // $location.path("/mySpaceMain");
        }, function (error) {
            data = error.data;
            console.log("status : " + data.status);
            alert("status : " + data.status);
        })
    }

    $scope.setMySpaceToCurrentRootMySpaces = function (item) {
        shareMySpaceServices.setCurrentRootMySpace(item);
    }

    $scope.getMySpaceToCurrentRootMySpaces = function () {
        $rootScope.currentRootMySpaces = shareMySpaceServices.getCurrentRootMySpaces();
    }


    $scope.getCustomHeader = function () {
        var customHeader = {
            headers: $scope.jwt
        };
        return customHeader;
    }

    $scope.init();

});