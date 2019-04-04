app.controller("headerController", function($scope,$http,$location,UserService,$localStorage){
    $scope.currentUser={};
    $scope.currentUser = $localStorage.currentUser;
});