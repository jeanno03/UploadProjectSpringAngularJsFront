app.controller("MySpaceController", function($scope,$http,$location,UserService,$localStorage){
$scope.jwt={};
$scope.jwt = $localStorage.jwt;
$scope.mySpaceMyUser = {};

//au lancement de la page va envoyer le token en header pour récupérer myUserDto
$scope.init=function(){
    $scope.getMyUserMySpaceJwt();
}

$scope.getMyUserMySpaceJwt=function(){
    $http.get("http://localhost:8080/MyUser/getMyUserMySpaceJwt",customHeader).then(function(response){
        console.log("success");
        data=response.data;
        $scope.mySpaceMyUser = data;
        console.log("$scope.mySpaceMyUser.login : " + $scope.mySpaceMyUser.login);
    },function(error){
        data = error.data;
        console.log("error : " + data.status);
        alert("error : " + data.status);
    })
    }
    
    
    var customHeader = {
        headers : $scope.jwt
    };


$scope.init();

$scope.getFiles=function(index){
    $scope.myFilesSelected={};
    $scope.myFilesSelected=$scope.mySpaceMyUser.mySpacesDto[index].myFilesDto;
}


});