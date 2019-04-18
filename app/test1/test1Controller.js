app.controller("Test1Controller", function ($scope, $rootScope, $http, $location, Logger, UserService, $localStorage, jwtHelper, httpHeaderService, httpPowerGedService) {
    $scope.myUsers = {};
    Logger.turnOn(); // On active le logger
    Logger.log('Page chargée !'); // Log au chargement de la page
    $scope.currentUserServiceRoot = {};

    $scope.credential = {};
    $scope.login = null;
    $scope.password = null;
    $scope.myuser = {};
    $scope.error = null;

    $scope.currentUser = {};
    $scope.currentUser = $localStorage.currentUser;

    $scope.uploadResult = "";

    //contient le mdp pour accéder au controller de test
    // var customHeader = {
    //     headers:
    //     {
    //         "bearer": "1234"
    //     }
    // };

    $scope.getDataTest = function () {
        $scope.str = null;
        $http.get(httpPowerGedService.getUrlMain() +"Test/getDataTest")
            .then(function (response) {
                data = response.data;
                $scope.str = data;
                console.log("str : " + $scope.str.return);
            }, function (error) {
                console.log(error, "can not get data");
            });
    };

    $scope.getAllUsersTest = function () {
        $scope.myRoles = {};
        $scope.mySpaces = {};
        $http.get(httpPowerGedService.getUrlMain() +"Test/getAllUsersTest")
            .then(function (response) {
                data = response.data;
                $scope.myUsers = data;
            }, function (error) {
                console.log(error);
            });
    };

    $scope.getContents = function (i) {
        $scope.myRoles = $scope.myUsers[i].myRoles;
        $scope.mySpaces = $scope.myUsers[i].mySpaces;
    }

    $scope.getMyUserToService = function (i) {
        $scope.currentUserServiceRoot = $scope.myUsers[i];
        UserService.setMyUser($scope.currentUserServiceRoot);

    }

    $scope.getMyUserToServiceGoToTest2 = function (i) {
        $scope.getMyUserToService(i);
        $location.path("/test2");

    }

    $scope.destroyMyUser = function () {
        UserService.destroyMyUser();
    }

    $scope.getConnect = function () {
        $http.post(httpPowerGedService.getUrlMain() +"Test/getConnect", $scope.credential).then(function (response) {
            console.log("success");
            data = response.data;
            console.log("data.login : " + data.login);

            $scope.myuser = data;
            $scope.userToSession($scope.myuser);

            $scope.goToMySpace($scope.myuser);


        }, function (error) {
            data = error.data;
            console.log("error : " + data.return);
            alert("error : " + data.return);
        });
    }

    $scope.goToMySpace = function (myUser) {
        $location.path("/test2");
    };

    $scope.toDisconnect = function () {
        $localStorage.currentUser = {};
        alert("Vous avez été déconnecté!");
        $location.path("/test2");
    }

    $scope.userToSession = function (myUser) {
        $localStorage.currentUser = myUser;
    }

    $scope.uploadResult = "";

    $scope.myForm = {
        description: "",
        files: []
    }

    $scope.doUploadFile = function () {

        var url = httpPowerGedService.getUrlMain() +"Test/uploadingPost";


        var data = new FormData();
        console.log(" $scope.myForm.files.length : " + $scope.myForm.files.length);
        data.append("description", $scope.myForm.description);

        for (i = 0; i < $scope.myForm.files.length; i++) {
            data.append("files", $scope.myForm.files[i]);
        }

        var config = {
            transformRequest: angular.identity,
            transformResponse: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }

        $http.post(url, data, config).then(
            // Success
            function (response) {
                $scope.uploadResult = response.data;
            },
            // Error
            function (response) {
                $scope.uploadResult = response.data;
            });
    };

    //au lancement de la page va envoyer le token en header pour récupérer myUserDto
    $scope.init = function () {
        //utile car le token est gardé meme si la page est fermé
        $rootScope.jwt = $localStorage.jwt;
        //on met le token dans le header
        $rootScope.customHeader = httpHeaderService.getTokenHeader();

        var expToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';

        var tokenPayload = jwtHelper.decodeToken(expToken);
        console.log("tokenPayload example 1 : " + tokenPayload);

        var expirationDate = jwtHelper.getTokenExpirationDate(expToken);
        console.log("expiration token example 1 : " + expirationDate);

        try {
            $scope.realToken = $localStorage.jwt;

            console.log("$scope.realToken.token : " + $scope.realToken.token);

            var realDecodeToken = httpHeaderService.getDecodeToken();
            console.log("realDecodeToken : " + realDecodeToken);

            console.log("realDecodeToken.kid : " + realDecodeToken.kid);
            console.log("realDecodeToken.alg : " + realDecodeToken.alg);
            console.log("realDecodeToken.sub : " + realDecodeToken.sub);
            console.log("realDecodeToken.iss : " + realDecodeToken.iss);
            console.log("realDecodeToken.roles[0] : " + realDecodeToken.roles[0]);


            var tokenSub = httpHeaderService.getTokenSub();
            console.log("tokenSub : " + tokenSub);

            var tokenRoles = httpHeaderService.getTokenRoles();
            console.log("tokenRoles[0] : " + tokenRoles[0]);

            var realExpirationTokenDate = httpHeaderService.getTokenExpirationDate();
            console.log("realExpirationTokenDate : " + realExpirationTokenDate);


            //test
            var token1 = $localStorage.jwt;
            console.log("token1 : " + token1);

            var token2 = $localStorage.jwt.token;
            console.log("token2 : " + token2);

        } catch (err) {
            console.log(err)
        }

    }

    $scope.init();

    $scope.getFile=function(){
        var url =httpPowerGedService.getUrlMain() +"Test/download2?image=Albator-007";
        window.open(url, '_blank', '');
    }


});