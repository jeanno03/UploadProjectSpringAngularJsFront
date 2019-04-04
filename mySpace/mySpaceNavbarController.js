app.controller("mySpaceNavbarController", function ($scope, $rootScope, $http, shareMyFileService) {
    $scope.myFiles = {};
    $rootScope.currentRootMyFiles = {};
    $scope.customHeader = {};
    // $scope.mySpaceName = null;


    $scope.getAllFilesFromMySpace = function (mySpaceName) {
        $http.get("http://localhost:8080/MyFile/getAllFilesFromMySpace", $scope.customHeader, mySpaceName).then(function (response) {
            data = response.data;
            $scope.myFiles=data;
        },function(error){
            data = error.data;
            console.log("error : " + data.statuts);
            alert("error : " + data.statuts);
        })
    }

    //service à prévoir
    $scope.getCustomHeader = function () {
        var customHeader = {
            headers: $scope.jwt
        };
        return customHeader;
    }


});