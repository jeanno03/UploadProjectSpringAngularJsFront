app.controller("Test2Controller", function($rootScope, $scope,$http,$location,UserService,$localStorage){

    $rootScope.currentUserServiceRoot = {};
    $rootScope.currentUserServiceRoot = UserService.getMyUser();
    // console.log("$rootScope.currentUser.login : " + $rootScope.currentUser)
    // $scope.currentUser = {}
    // $scope.currentUser = UserService.getMyUser();
    // console.log("$scope.currentUser.login : " + $scope.currentUser)

    $scope.currentUser={};
    $scope.currentUser = $localStorage.currentUser;

    $scope.getFiles=function(index){
        $scope.myFilesSelected={};
        $scope.myFilesSelected=$scope.currentUser.mySpacesDto[index].myFilesDto;
    }

});