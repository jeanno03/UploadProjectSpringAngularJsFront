app.controller("HomeController", function($scope,$http,$location,$localStorage){
    $scope.currentUser={};
    $scope.currentUser = $localStorage.currentUser;

});