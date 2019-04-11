var httpService = angular.module("httpService",[]);

httpService.factory("httpUrlService", function ($http, httpHeaderService){

return {

    getAllMySpacesJwt: function (customHeader) {
        return $http.get("http://localhost:8080/MySpace/getAllMySpaceJwt", customHeader);
    },

    selectMySpace: function (item, customHeader) {
        return $http.get("http://localhost:8080/MySpace/getMySpaceByName?name=" + item, customHeader);
    },

    createMySpace:function (mySpace, customHeader){
        return $http.post("http://localhost:8080/MySpace/createMySpace", mySpace, customHeader);
    },

    downloadingMyFile:function(item, customHeader){
        return $http.get("http://localhost:8080/MyFile/downloadingMyFile?fichier=" + item, customHeader, {responseType: "arraybuffer"});
    },

    getConnectJwt: function (credential) {
        return $http.post("http://localhost:8080/MyUser/getConnectJwt", credential);
    },

    getUploadFile: function (mySpaceId, data) {

        var uploadFileUrl = "http://localhost:8080/MyFile/uploadingMyFilesPut?id=";
        var tokenHeaderContentType = httpHeaderService.getTokenHeaderContentType();

        return $http.put(uploadFileUrl + mySpaceId, data, tokenHeaderContentType);
    }

}


})