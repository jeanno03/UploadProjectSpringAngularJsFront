app.controller("mySpaceNavbarController", function ($scope, $rootScope, $http, shareMyFileService, $location, shareMySpaceServices, connectionTokenService, mySpaceHttpService) {
    $scope.myFiles = {};
    $scope.customHeader = {};

    $rootScope.currentRootMySpace = {};

    $scope.mySpace = {};
    $scope.mySpaceByName = {};

    $scope.mySpaceMyUser = {};

    $scope.mode = 0;

    $scope.selectMySpace = function (item) {
        mySpaceHttpService.selectMySpace(item, $rootScope.customHeader).then(function (response) {
            data = response.data;
            $scope.mySpaceByName = data;
            $scope.processSetCurrentRootMySpace($scope.mySpaceByName);

        }, function (error) {
            data = error.data;
            console.log("error : " + data.statuts);
            alert("status : " + data.statuts);
        })
    }

    $scope.createNewMySpace = function (item) {

        // $http.post("http://localhost:8080/MySpace/createMySpace", $scope.mySpace, $rootScope.customHeader)
        mySpaceHttpService.createMySpace($scope.mySpace, $rootScope.customHeader)
            .then(function (response) {
                data = response.data;
                $scope.mySpaceMyUser = data;
                var mySpaceProvisoire = $scope.mySpace.name;

                //je réinitialise
                $scope.mySpace = {};

                //Je retire le formulaire
                $scope.mode = 0;

                shareMySpaceServices.setCurrentRootMySpace

                //je recherche le nouvel espace créé qui va afficher dans mySpaceDescription
                $scope.selectMySpace(mySpaceProvisoire);


            }, function (error) {
                data = error.data;
                console.log("status : " + data.status)
            })
    };

    $scope.displayForm = function () {
        $scope.mode = 1;
    }

    $scope.cancelForm = function () {
        $scope.mode = 0;
    }

    $scope.processSetCurrentRootMySpace = function (item) {
        shareMyFileService.setCurrentRootMySpace(item);
        $rootScope.currentRootMySpace = shareMyFileService.getCurrentRootMySpace();
        //on rafraichit l'ensemble de page (mySpaceMain)
        $location.path("/mySpaceMain");
    }


    $scope.init = function () {
        //on met le token dans le header
        $rootScope.customHeader = connectionTokenService.getTokenHeader();
    }

    $scope.init();

});