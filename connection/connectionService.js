var connectionService = angular.module("connectionService",[]);

connectionService.factory("connectionHttpService", function ($http){

    return {
        getConnectJwt:function(credential){
            return $http.post("http://localhost:8080/MyUser/getConnectJwt", credential);
        },
    }
});



connectionService.factory("connectionTokenService",function($localStorage){
    return{
        
        getTokenHeader:function(){
            var customHeader = {
                headers:$localStorage.jwt
            };

            return customHeader;

        }
    }
})