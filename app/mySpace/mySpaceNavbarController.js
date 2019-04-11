app.controller("mySpaceNavbarController", function ($scope, $rootScope, shareMyFileService, $location, shareMySpaceServices, httpHeaderService, httpUrlService) {

    $scope.customHeader = {};
    $rootScope.currentRootMySpace = {};
    $scope.mySpace = {};
    $scope.mySpaceByName = {};
    $scope.mySpaceMyUser = {};

    $scope.mode = 0;

    $rootScope.selectMySpace = function (item) {
        httpUrlService.selectMySpace(item, $rootScope.customHeader).then(function (response) {
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
        httpUrlService.createMySpace($scope.mySpace, $rootScope.customHeader)
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
                $rootScope.selectMySpace(mySpaceProvisoire);

                //je réactualise la liste
                $rootScope.getAllMySpacesJwt();


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
    }

    $scope.init();

});