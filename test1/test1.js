app.controller("Test1Controller", function ($scope, $http, $location, Logger, UserService, $localStorage) {
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

    //contient le mdp pour accéder au controller de test
    var customHeader = {
        headers:
        {
            "bearer": "1234"
        }
    };


    $scope.getDataTest = function () {
        $scope.str = null;
        $http.get("http://localhost:8080/Test/getDataTest", customHeader)
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
        $http.get("http://localhost:8080/Test/getAllUsersTest", customHeader)
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
        $http.post("http://localhost:8080/Test/getConnect", $scope.credential).then(function (response) {
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

        var url = "http://localhost:8080/Test/uploadingPost";


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


});