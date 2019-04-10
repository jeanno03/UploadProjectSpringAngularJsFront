app.controller("mySpaceMainController", function ($window, $scope, $rootScope, $http, $location, shareMySpaceServices, $localStorage, mySpaceHttpService, connectionTokenService, connectionHttpService) {

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

        connectionHttpService.getUploadFile(mySpaceId, data).
            then(function (response) {
                //Success
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


    //https://stackoverflow.com/questions/40606181/download-zip-file-from-rest-web-service-angularjs
    //https://stackoverflow.com/questions/29747136/download-a-file-using-angular-js-and-a-spring-based-restful-web-service
    //https://stackoverflow.com/questions/20099784/open-links-in-new-window-using-angularjs/33837795

    //http://javabypatel.blogspot.com/2016/11/download-binary-file-angularjs-rest.html
    $scope.downloadingMyFile = function (id, name) {
        console.log("angularJs - downloadingMyFile2");
        var url = "http://localhost:8080/MyFile/downloadingMyFile?fichier=" + id;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.setRequestHeader("token", $localStorage.jwt.token);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
            if (this.status === 200) {
                var blob = new Blob([xhr.response]);
                var a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = name;
                a.click();
            }
        };
        xhr.send(JSON.stringify(
            {

            })
        );
    };

});