app.controller("SearchController", function($scope,$http,$location,$localStorage){
    $scope.currentUser={};
    $scope.currentUser = $localStorage.currentUser;
});