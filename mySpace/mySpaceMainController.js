app.controller("mySpaceMainController", function ($scope, $rootScope, $http, $location, shareMySpaceServices, $localStorage, mySpaceHttpService, connectionTokenService, connectionHttpService) {

    $scope.mySpaces = {};
    // $rootScope.customHeader = connectionTokenService.getTokenHeader();


    //au lancement de la page va envoyer le token en header pour récupérer myUserDto
    $scope.init = function () {
        //utile car le token est gardé meme si la page est fermé
        $rootScope.jwt = $localStorage.jwt;
        //on met le token dans le header
        $rootScope.customHeader = connectionTokenService.getTokenHeader();
        $scope.getAllMySpacesJwt();

    }

    //(requete native en back)
    $scope.getAllMySpacesJwt = function () {

        mySpaceHttpService.getAllMySpacesJwt($rootScope.customHeader).then(function (response) {
            data = response.data;
            $scope.mySpaces = data;

            //je partage $scope.mySpaces
            $rootScope.currentRootMySpaces = {};
            $scope.setMySpaceToCurrentRootMySpaces($scope.mySpaces);
            $scope.getMySpaceToCurrentRootMySpaces();

            //pour rafraichir et lancer le init() de ConnectionController
            $location.path("/mySpaceMain");

        }, function (error) {
            data = error.data;
            console.log("message : " + data.message);
            alert("message : " + data.message);
            $location.path("/home");

        })

    }

    $scope.setMySpaceToCurrentRootMySpaces = function (item) {
        shareMySpaceServices.setCurrentRootMySpace(item);
    }

    $scope.getMySpaceToCurrentRootMySpaces = function () {
        $rootScope.currentRootMySpaces = shareMySpaceServices.getCurrentRootMySpaces();
    }

    $scope.init();

    $scope.uploadResult = {};

    $scope.myForm = {
        multipartFiles: []
    }

    $scope.doUploadFile = function () {

        var mySpaceId = $rootScope.currentRootMySpace.id;
        var data = new FormData();

        for (i = 0; i < $scope.myForm.multipartFiles.length; i++) {
            data.append("multipartFiles", $scope.myForm.multipartFiles[i])
        }

        connectionHttpService.getUploadFile(mySpaceId, data).then(
            //Success
            function (response) {
                data = response.data;
                $scope.uploadResult = data;

                alert("votre fichier a été uploadé!");

                //je réinitialise
                $scope.myForm = {
                    multipartFiles: []
                }
                $location.path("/mySpaceMain");
            },
            //Error
            function (error) {
                error = error.data;
                alert("status : " + error.status);
            });
    };

});