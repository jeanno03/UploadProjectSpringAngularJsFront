var httpService = angular.module("httpService", []);

httpService.factory("httpUrlService", function ($http, httpHeaderService, httpPowerGedService) {

    return {

        getAllMySpacesJwt: function (customHeader) {
            return $http.get(httpPowerGedService.getUrlMain() +"MySpace/getAllMySpaceJwt", customHeader);
        },

        selectMySpace: function (item, customHeader) {
            return $http.get(httpPowerGedService.getUrlMain() +"MySpace/getMySpaceByName?name=" + item, customHeader);
        },

        createMySpace: function (mySpace, customHeader) {
            return $http.post(httpPowerGedService.getUrlMain() +"MySpace/createMySpace", mySpace, customHeader);
        },

        downloadingMyFile: function (item, customHeader) {
            return $http.get(httpPowerGedService.getUrlMain() +"MyFile/downloadingMyFile?fichier=" + item, customHeader, { responseType: "arraybuffer" });
        },

        getConnectJwt: function (credential) {
            return $http.post(httpPowerGedService.getUrlMain() +"MyUser/getConnectJwt", credential);
        },

        getUploadFile: function (mySpaceId, data) {

            var uploadFileUrl = httpPowerGedService.getUrlMain() +"MyFile/uploadingMyFilesPut?id=";
            var tokenHeaderContentType = httpHeaderService.getTokenHeaderContentType();

            return $http.put(uploadFileUrl + mySpaceId, data, tokenHeaderContentType);
        },

        getUrlDownloadingMyFile: function (id) {
            var urlDownLoading = httpPowerGedService.getUrlMain() +"MyFile/downloadingMyFile?fichier=" + id;
            return urlDownLoading;
        }

    }

})

httpService.factory("httpPowerGedService", function () {
    return {
        getUrlMain: function () {
            var powerGedUrl = "https://91.134.143.236:8443/Main/";
            // var powerGedUrl = "https://power-ged:8443/Main/";
            // var powerGedUrl = "http://power-ged:8080/Main/";          
            // var powerGedUrl = "http://localhost:8080/";
            return powerGedUrl;
        }
    }

})