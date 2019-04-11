app.controller("Test2Controller", function ($rootScope, $scope, UserService, $localStorage) {

    $rootScope.currentUserServiceRoot = {};
    $rootScope.currentUserServiceRoot = UserService.getMyUser();
    $scope.currentUser = {};
    $scope.currentUser = $localStorage.currentUser;

    $scope.getFiles = function (index) {
        $scope.myFilesSelected = {};
        $scope.myFilesSelected = $scope.currentUser.mySpacesDto[index].myFilesDto;
    }

});