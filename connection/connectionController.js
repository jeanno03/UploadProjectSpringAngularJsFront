app.controller("ConnectionController", function($scope,$http,$location,$localStorage){

    $scope.credential={};
    $scope.login=null;
    $scope.password=null;  
    // $scope.myuser={};
    $scope.error=null;
    $scope.jwt={};
    $scope.jwt=$localStorage.jwt;
    $scope.currentUser={};
    $scope.currentUser = $localStorage.currentUser;

    $scope.getConnect=function(){
        $http.post("http://localhost:8080/MyUser/getConnectJwt", $scope.credential).then(function(response){         
            console.log("success");
            data = response.data;
            // $scope.myuser = data;
            $scope.jwt = data;
            console.log("$scope.jwt.token : " + $scope.jwt.token);

            $scope.tokenToLocalStorage($scope.jwt);
            $scope.goToMySpace();


        },function(error){
            data = error.data;
            console.log("error : " + data.return);
            alert("error : " + data.return);
        });
    }

    $scope.tokenToLocalStorage=function(jwt){
    $localStorage.jwt=jwt;
    }

$scope.goToMySpace=function(){ 
    $location.path("/myspace");
};

$scope.toDisconnect=function(){
    $localStorage.jwt={};
    alert("Vous avez été déconnecté!");
    $location.path("/home");
}


});
