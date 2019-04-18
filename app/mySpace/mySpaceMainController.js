app.controller("mySpaceMainController", function ($scope, $rootScope, $location, shareMySpaceServices, shareMyFileService, $localStorage, httpHeaderService, httpUrlService) {
    $scope.login = null;
    $scope.mySpaces = {};

    $scope.uploadResult = {};

    $scope.myForm = {
        multipartFiles: []
    }

    //(requete native en back)
    $rootScope.getAllMySpacesJwt = function () {
        console.log("getAllMySpacesJwt()");

        httpUrlService.getAllMySpacesJwt($rootScope.customHeader).then(function (response) {
            data = response.data;
            $scope.mySpaces = data;

            //je partage $scope.mySpaces
            shareMySpaceServices.setCurrentRootMySpace($scope.mySpaces);
            $rootScope.currentRootMySpaces = shareMySpaceServices.getCurrentRootMySpaces();
            //pour rafraichir et lancer le init() de ConnectionController
            $location.path("/mySpaceMain");

        }, function (error) {
            data = error.data;
            console.log("message : " + data.message);
            alert("message : " + data.message);
            $location.path("/home");

        })

    }

    $scope.doUploadFile = function () {

        var mySpaceId = $rootScope.currentRootMySpace.id;
        var data = new FormData();

        for (i = 0; i < $scope.myForm.multipartFiles.length; i++) {
            data.append("multipartFiles", $scope.myForm.multipartFiles[i])
        }

        httpUrlService.getUploadFile(mySpaceId, data).
            then(function (response) {
                //Success
                data = response.data;
                $scope.uploadResult = data;

                alert("votre fichier a été uploadé!");

                //je réinitialise
                $scope.myForm = {
                    multipartFiles: []
                }

                //je réaffiche la liste de tous les fichiers
                $rootScope.selectMySpace($rootScope.currentRootMySpace.name);
                $rootScope.currentRootMySpace = shareMyFileService.getCurrentRootMySpace();

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
        // var url = "http://localhost:8080/MyFile/downloadingMyFile?fichier=" + id;
        var url = httpUrlService.getUrlDownloadingMyFile(id);
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

    $scope.init = function () {
        //utile car le token est gardé meme si la page est fermé
        $rootScope.jwt = $localStorage.jwt;
        //on met le token dans le header
        $rootScope.customHeader = httpHeaderService.getTokenHeader();

        //je récupère le login
        var decodeToken = httpHeaderService.getDecodeToken();
        $scope.login = decodeToken.sub;

        $rootScope.currentRootMySpaces = shareMySpaceServices.getCurrentRootMySpaces();
        $rootScope.currentRootMySpace = shareMyFileService.getCurrentRootMySpace();
        try {
            if ($rootScope.currentRootMySpaces[0] == null) {
                console.log("need to launch getAllMySpacesJwt()");
                $scope.getAllMySpacesJwt();
            }

        } catch (err) {
            console.log(err);
        }

    }

    $scope.init();

});