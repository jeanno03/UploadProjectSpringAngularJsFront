app.controller("mySpaceDescriptionController", function ($scope, $rootScope, shareMyFileService, $location) {

    $scope.init = function () {
        $rootScope.currentRootMySpace = shareMyFileService.getCurrentRootMySpace();
        //on rafraichit l'ensemble de page (mySpaceMain)
        $location.path("/mySpaceMain");
    }

    $scope.init();
});