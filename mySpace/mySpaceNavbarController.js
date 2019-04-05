app.controller("mySpaceNavbarController", function ($scope, $rootScope, $http, shareMyFileService, $localStorage, $location, shareMySpaceServices) {
    $scope.myFiles = {};
    $rootScope.currentRootMyFiles = {};
    $scope.jwt = {};
    $scope.jwt = $localStorage.jwt;
    $scope.customHeader = {};

    // $scope.newMySpaceName = null;
    // $scope.newMySpaceDescription=null;

    $rootScope.currentRootMySpaceName=null;

    $scope.mySpace = {};

    $scope.mySpaceMyUser = {};

    $scope.mode = 0;

    $scope.getAllFilesFromMySpace = function (item) {
        $scope.customHeader = $scope.getCustomHeader();
        console.log("getAllFilesFromMySpace() - param item: " + item);
        $http.get("http://localhost:8080/MyFile/getAllFilesFromMySpace?name=" + item, $scope.customHeader).then(function (response) {
            data = response.data;
            $scope.myFiles = data;
            //on inject $scope.myFiles dans le service
            $scope.getMyFilesToCurrentRootMyFiles($scope.myFiles);
            //on le partage au niveau du $rootScope.currentRootMyFiles
            $rootScope.currentRootMyFiles = shareMyFileService.getCurrentRootMyFile();
            
            
            shareMyFileService.setCurrentRootMySpaceName(item);
            $rootScope.currentRootMySpaceName=shareMyFileService.getCurrentRootMySpaceName();
            
            
            
            //on rafraichit l'ensemble de page (mySpaceMain)
            $location.path("/mySpaceMain");
        }, function (error) {
            data = error.data;
            console.log("error : " + data.statuts);
            alert("status : " + data.statuts);
        })
    }

    //service à prévoir
    $scope.getCustomHeader = function () {
        var customHeader = {
            headers: $scope.jwt
        };
        return customHeader;
    }

    $scope.getMyFilesToCurrentRootMyFiles = function (item) {
        shareMyFileService.setCurrentRootMyFile(item);
    }

    $scope.createNewMySpace = function (item) {
        console.log("$scope.mySpace : " + $scope.mySpace.name);
        console.log("$scope.mySpace : " + $scope.mySpace.description);

        $scope.customHeader = $scope.getCustomHeader();
        $http.post("http://localhost:8080/MySpace/createMySpace", $scope.mySpace, $scope.customHeader)
            .then(function (response) {
                data = response.data;
                $scope.mySpaceMyUser = data;

                //a cause du traitement asynchrone ces 2 services ne s'initilise pas au lancement de mySpaceMain
                //rajouté à la main
                // //je partage 
                shareMySpaceServices.setCurrentRootMySpace($scope.mySpaceMyUser)
                // //je set le root
                $rootScope.currentRootMySpaces = {};
                $rootScope.currentRootMySpaces = shareMySpaceServices.getCurrentRootMySpaces();

                //Je retire le formulaire
                $scope.mode = 0;

                //je réinitialise
                $scope.mySpaceMyUser = {};
                $scope.goToMySpace();

            }, function (error) {
                console.log("status : " + data.status)
            })
    };

    $scope.displayForm = function () {
        $scope.mode = 1;
    }

    $scope.cancelForm = function () {
        $scope.mode = 0;
    }

    $scope.goToMySpace = function () {
        $location.path("/mySpaceMain");
    };


});